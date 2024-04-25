import app from "../static/app.png";
import { motion } from "framer-motion";

const ScreenShotSection = () => {
  return (
    <section id="app-showcase-section">
      <h2>Data Driven, Intuitive UI</h2>
      <motion.div
        className="image-bg"
        initial={{ opacity: 0, scale: 0.5, rotateX: -50 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{
          duration: 5,
          ease: "circIn",
        }}
        viewport={{ once: true, amount: 0.5 }}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2,
          ease: "circIn",
        }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <img id="app-screenshot" src={app} />
      </motion.div>
    </section>
  );
};

export default ScreenShotSection;
