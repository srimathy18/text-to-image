import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  // This function simulates the dummy payment process.
  const initPay = async (order) => {
    // Simulate a delay as if processing payment
    setTimeout(async () => {
      try {
        // Call the dummy verify endpoint using the transaction receipt
        const { data } = await axios.post(
          `${backendUrl}/api/user/verify-dummy`,
          { receipt: order.receipt },
          { headers: { token } }
        );
        if (data.success) {
          loadCreditsData();
          navigate('/');
          toast.success('Credits Added');
        } else {
          toast.error(data.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error("Verification Error:", error);
        toast.error(error.message || "Payment verification failed");
      }
    }, 2000); // 2-second delay to mimic processing time
  };

  // This function initiates the dummy payment process.
  const paymentDummy = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }
      // Call the dummy payment endpoint
      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-dummy`,
        { userId: user._id, planId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message || "Payment failed. Try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      className="min-h-[80vh] text-center pt-14 mb-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.button
        className="border border-gray-400 px-10 py-2 rounded-full mb-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Our Plans
      </motion.button>

      <motion.h1
        className="text-center text-3xl font-medium mb-6 sm:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Choose a Plan
      </motion.h1>

      <motion.div
        className="flex flex-wrap justify-center gap-6 text-left"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {plans.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <img width={40} src={assets.logo} alt="logo" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> / {item.credits} credits
            </p>

            <motion.button
              onClick={() => paymentDummy(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user ? 'Purchase' : 'Get Started'}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BuyCredit;
