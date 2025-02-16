import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, setShowLogin ,logout,credit} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="w-full top-0 left-0 z-50 py-4 px-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-24 sm:w-32 lg:w-40" />
      </Link>

      {/* Right Section */}
      <div>
        {user ? (
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => navigate('/buy')}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                Credit Left: {credit}
              </p>
            </button>
            <p className="text-gray-500 hidden sm:block">Hi,{user.name}there!</p>
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10 drop-shadow" alt="" />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-1 bg-white rounded-md border text-xs shadow-md w-28">
                  <li onClick={logout}className="py-1 px-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded text-center transition-all">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-5">
            <p onClick={() => navigate('/buy')} className="cursor-pointer">
              Pricing
            </p>
            <button onClick={() => setShowLogin(true)} className="bg-zinc-800 text-white px-6 sm:px-4 py-2 text-sm rounded-full">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
