import React from 'react';
import { assets } from '../assets/assets';

function Footer() {
  return (
    <div className=" text-black py-6 mt-20 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        {/* Logo */}
        <img src={assets.logo} alt="Logo" width={150} className="brightness-200" />

        {/* Copyright Text */}
        <p className="flex-1 border-l border-gray-500 pl-4 text-sm text-black-400 hidden md:block">
          Copyrights © Imagiai | All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6">
          <img src={assets.facebook_icon} alt="Facebook" width={35} className="hover:opacity-80 transition duration-300" />
          <img src={assets.twitter_icon} alt="Twitter" width={35} className="hover:opacity-80 transition duration-300" />
          <img src={assets.instagram_icon} alt="Instagram" width={35} className="hover:opacity-80 transition duration-300" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
