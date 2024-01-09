import app from "../static/app.png";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="app-showcase-section">
      <motion.div
        className="image-bg"
        initial={{ opacity: 0, scale: 0.5, rotateX: -50}}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{
          duration: 5,
          ease: "circIn",
        }}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2,
          ease: "circIn",
        }}
      >
        <img id="app-screenshot" src={app} />
      </motion.div>
    </section>
  );
};

export default About;
