import { React, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

function Result() {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const {generateImage}=useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (input) {
      const image = await generateImage(input);
  
      if (image) {
        setImageLoaded(true);
        setImage(image);  // Set the generated image properly
      } else {
        toast.error("Failed to generate image. Please try again.");
      }
    } else {
      toast.error("Please enter a prompt!");
    }
  
    setLoading(false);
  };
  
  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center -mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div>
        <div className="relative">
          {/* Image */}
          <motion.img
            src={image}
            alt="Generated"
            className="max-w-sm rounded shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Blue Loading Bar */}
          <motion.span
            className="absolute bottom-0 left-0 h-1 bg-blue-500"
            initial={{ width: '0%' }}
            animate={{ width: loading ? '100%' : '0%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>

        {/* Loading Text */}
        {loading && (
          <motion.p
            className="text-gray-600 mt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Loading...
          </motion.p>
        )}
      </div>

      {/* Input Section */}
      {!isImageLoaded && (
        <motion.div
          className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-8 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate..."
            className="flex-1 bg-transparent outline-none ml-8 placeholder-gray-300"
          />
          <motion.button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate
          </motion.button>
        </motion.div>
      )}

      {/* Buttons for Download & Generate Another */}
      {isImageLoaded && (
        <motion.div
          className="flex gap-4 flex-wrap justify-center text-white text-sm p-0.5 mt-8 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Generate Another Button */}
          <motion.p
            onClick={() => setImageLoaded(false)}
            className="bg-transparent border border-zinc-900 text-black px-5 py-2 rounded-full cursor-pointer text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate Another
          </motion.p>

          {/* Download Button */}
          <motion.a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download
          </motion.a>
        </motion.div>
      )}
    </motion.form>
  );
}

export default Result;
