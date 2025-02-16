import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

function Header() {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center min-h-screen px-4"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Badge Section */}
      <motion.div
        className="text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 mb-1 mt-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>Best tool for generating images from text</p>
        <img src={assets.star_icon} alt="star icon" className="w-5 h-5" />
      </motion.div>

      {/* Heading */}
      <motion.div
        className="max-w-[600px] mx-auto mt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.4 }}
      >
        <motion.h2
          className="text-4xl sm:text-6xl font-bold leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Break your{" "}
          <motion.span
            className="text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            ideas
          </motion.span>{" "}
          into{" "}
          <motion.span
            className="text-pink-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            captivating pictures.
          </motion.span>
        </motion.h2>
        <motion.p
          className="text-gray-600 text-base sm:text-md mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Generate stunning, high-quality images from text in seconds.  
          Bring your imagination to life with AI-powered creativity.
        </motion.p>

        {/* Button with Hover Effect */}
        <motion.div className="flex justify-center">
          <motion.button
            onClick={onClickHandler}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center justify-center gap-2 rounded-full"
          >
            Generate visuals
            <img className="h-6" src={assets.star_group} alt="star group icon" />
          </motion.button>
        </motion.div>

        {/* Sample Images with Hover Effects */}
        <motion.div
          className="flex flex-wrap justify-center mt-12 gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 1 },
            },
          }}
        >
          {Array(6)
            .fill("")
            .map((_, index) => (
              <motion.img
                className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                alt={`sample ${index + 1}`}
                key={index}
                width={70}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
              />
            ))}
        </motion.div>

        {/* Footer Text */}
        <motion.p
          className="mt-2 text-neutral-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Generated visuals from Imagiai
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default Header;
