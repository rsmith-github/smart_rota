import * as THREE from 'https://cdn.skypack.dev/three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(250, 250);
document.getElementById("canvas-container").appendChild(renderer.domElement);

const geometry = new THREE.RingGeometry(5, 10, 8, 8, 0, 0);

const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Create a wireframe geometry from the ring geometry
const wireframeGeometry = new THREE.WireframeGeometry(geometry);
// Create a material for the wireframe
const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
// Create the wireframe mesh
let wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

// Add the wireframe mesh to the scene
scene.add(wireframe);

const light = new THREE.PointLight("white", 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 50;

let thetaLength = 0;
let increase = true;

function animate() {
  if (increase === true) scene.remove(wireframe);
  // update the position of the ring
  if (increase) {
    thetaLength += Math.PI / 54;
    const geometry = new THREE.RingGeometry(9, 18, 8, 1, 0, thetaLength);
    // Create a wireframe geometry from the ring geometry
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    // Create a material for the wireframe
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    // Create the wireframe mesh
    wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    // Add the wireframe mesh to the scene
    scene.add(wireframe);
    if (thetaLength >= Math.PI * 2) {
      increase = false;
    }
  } else {
    wireframe.rotation.y += 0.03; // rotate the wireframe around the Y axis
  }

  // render the scene
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// update the camera aspect ratio on window resize
function onWindowResize() {
    const canvasContainer = document.getElementById("canvas-container");
    const canvasWidth = canvasContainer.clientWidth;
    const canvasHeight = canvasContainer.clientHeight;
  
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
  
    // calculate the new height based on the new width and aspect ratio
    const newHeight = Math.round(canvasWidth / camera.aspect);
  
    renderer.setSize(canvasWidth, newHeight);
  }

window.addEventListener('resize', onWindowResize);
