import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

function Steps() {
  // Define hover colors & border shadows
  const hoverStyles = [
    { bg: "hover:bg-red-100", shadow: "hover:shadow-red-300" },
    { bg: "hover:bg-blue-100", shadow: "hover:shadow-blue-300" },
    { bg: "hover:bg-green-100", shadow: "hover:shadow-green-300" },
    { bg: "hover:bg-yellow-100", shadow: "hover:shadow-yellow-300" },
  ];

  return (
    <motion.div
      className="text-center px-6 py-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl font-semibold mb-2 text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        The Magic Behind It
      </motion.h1>
      <motion.p
        className="text-md text-gray-600 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Convert Words into Visual Masterpieces
      </motion.p>

      {/* Steps Container */}
      <motion.div
        className="flex flex-col gap-4 max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.5 },
          },
        }}
      >
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            className={`flex items-center bg-white shadow-md rounded-lg p-4 border border-transparent transition-all duration-300 
            ${hoverStyles[index % hoverStyles.length].bg} 
            ${hoverStyles[index % hoverStyles.length].shadow} 
            hover:border-opacity-75 hover:border-2`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Step Icon */}
            <motion.div
              className="flex-shrink-0 bg-gray-200 rounded-lg p-2 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.img
                src={item.icon}
                alt={item.title}
                className="w-10 h-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
            </motion.div>

            {/* Step Title & Description */}
            <div className="ml-3 text-left">
              <h2 className="text-md font-semibold text-gray-900">{item.title}</h2>
              <p className="text-gray-600 text-xs">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Steps;
