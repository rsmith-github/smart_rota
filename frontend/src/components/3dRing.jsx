import React, { useEffect } from "react";
import * as THREE from "three";

function Ring() {
  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera with a 75-degree field of view, aspect ratio of 1, and a near clipping plane of 0.1 and far clipping plane of 1000
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    // Create a renderer that supports transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    // Set the renderer size to 250 x 250 and append it to the canvas container
    renderer.setSize(250, 250);
    const canvasContainer = document.getElementById("canvas-container");
    canvasContainer.appendChild(renderer.domElement);

    // Create a ring geometry with an inner radius of 5, outer radius of 10, and 8 segments
    const geometry = new THREE.RingGeometry(5, 10, 8, 8, 0, 0);

    // Create a basic material with a white color
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Create a mesh with the ring geometry and the basic material
    const mesh = new THREE.Mesh(geometry, material);

    // Add the mesh to the scene
    scene.add(mesh);

    // Create a wireframe geometry from the ring geometry
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);

    // Create a material for the wireframe
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    // Create the wireframe mesh
    let wireframe = new THREE.LineSegments(
      wireframeGeometry,
      wireframeMaterial
    );

    // Add the wireframe mesh to the scene
    scene.add(wireframe);

    // Create a point light with white color, intensity of 1, and a distance of 100
    const light = new THREE.PointLight("white", 1, 100);

    // Set the position of the light
    light.position.set(10, 10, 10);

    // Add the light to the scene
    scene.add(light);

    // Set the camera position
    camera.position.z = 50;

    // Set initial values for theta length and increase flag
    let thetaLength = 0;
    let increase = true;

    // Define the animation function
    function animate() {
      // If increase flag is true, remove the wireframe mesh from the scene
      if (increase === true) scene.remove(wireframe);

      // Update the position of the ring if increase flag is true
      if (increase) {
        thetaLength += Math.PI / 54;
        const geometry = new THREE.RingGeometry(9, 18, 8, 1, 0, thetaLength);
        const wireframeGeometry = new THREE.WireframeGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
        });
        wireframe = new THREE.LineSegments(
          wireframeGeometry,
          wireframeMaterial
        );
        scene.add(wireframe);
        if (thetaLength >= Math.PI * 2) {
          increase = false;
        }
      } else {
        wireframe.rotation.y += 0.03; // Rotate the wireframe mesh around the Y axis
      }

      // Render the scene
      renderer.render(scene, camera);

      // Request the next animation frame
      requestAnimationFrame(animate);
    }

    // Start the animation
    animate();

    function onWindowResize() {
      // Get the width and height of the canvas container
      const canvasWidth = canvasContainer.clientWidth;
      const canvasHeight = canvasContainer.clientHeight;

      // Set the camera aspect ratio based on the new width and height
      camera.aspect = canvasWidth / canvasHeight;
      camera.updateProjectionMatrix();

      // Calculate the new height based on the new width and aspect ratio
      const newHeight = Math.round(canvasWidth / camera.aspect);

      // Set the new size of the renderer
      renderer.setSize(canvasWidth, newHeight);
    }

    // Add the window resize event listener
    window.addEventListener("resize", onWindowResize);

    // Return a function to clean up Three.js objects
    return () => {
      // Remove the mesh and wireframe from the scene
      scene.remove(mesh);
      scene.remove(wireframe);

      // Dispose of the geometries and materials
      geometry.dispose();
      material.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();

      // Dispose of the renderer
      renderer.dispose();
    };
  }, []);

  return <div id="canvas-container"></div>;
}

export default Ring;
