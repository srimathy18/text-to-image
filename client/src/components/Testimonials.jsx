import React from "react";
import { motion } from "framer-motion";
import { assets, testimonialsData } from "../assets/assets";

function Testimonials() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 w-full h-full min-h-screen bg-cover bg-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl font-semibold mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Customer Testimonials
      </motion.h1>
      <motion.p
        className="text-gray-500 mb-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        What Our Users Are Saying About Us
      </motion.p>

      {/* Testimonials Section */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto pb-20"
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
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white/20 p-8 md:p-10 rounded-lg shadow-md border border-gray-300 w-[320px] min-w-[300px] cursor-pointer 
            hover:scale-105 hover:shadow-[0_0_20px_rgba(255,165,0,0.6)] hover:border-orange-400 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <motion.img
                src={testimonial.image}
                alt=""
                className="rounded-full w-16 h-16 border border-gray-300 shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
              />

              {/* Name & Role */}
              <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
              <p className="text-gray-500 mb-4">{testimonial.role}</p>

              {/* Rating Stars Animation */}
              <motion.div
                className="flex mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              >
                {Array(testimonial.stars)
                  .fill()
                  .map((_, i) => (
                    <motion.img
                      key={i}
                      src={assets.rating_star}
                      alt=""
                      className="w-5 h-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                  ))}
              </motion.div>

              {/* Testimonial Text */}
              <motion.p
                className="text-center text-sm text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
                viewport={{ once: true }}
              >
                {testimonial.text}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Testimonials;
