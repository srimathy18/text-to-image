import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function Description() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-24 p-6 md:px-28 min-h-screen w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Heading Section */}
      <motion.h1
        className="text-3xl sm:text-4xl font-semibold mb-2 text-center text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Visualize your creativity with AI magic
      </motion.h1>
      <motion.p
        className="text-gray-500 mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Let AI paint your imagination into reality
      </motion.p>

      {/* Content Section */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8 md:gap-14 w-full flex-grow"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.5 },
          },
        }}
      >
        {/* Image Section */}
        <motion.div
          className="relative flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            src={assets.sample_img_2}
            alt="AI Generated Sample"
            className="w-full max-w-[500px] xl:max-w-[550px] rounded-lg border border-gray-300 shadow-md transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="flex-1 max-w-lg text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl font-medium mb-4 text-black"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Introducing an intelligent tool that turns text into art
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Imagiai is an advanced AI-powered tool that transforms text into stunning, high-quality images within seconds. 
            Simply describe your vision, and our intelligent system will bring your imagination to life with visually captivating results 🚀🎨
          </motion.p>
          <motion.p
            className="text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            With just a few words, transform your thoughts into visually stunning images. Whether it's a concept, a dream, or an idea, 
            our AI-powered tool turns it into reality. Experience creativity without limits and bring your imagination to life effortlessly.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Description;
