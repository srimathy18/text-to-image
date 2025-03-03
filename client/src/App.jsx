import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import BuyCredit from './pages/BuyCredit';
import Result from './pages/Result';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';

const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col text-white">
      <ToastContainer position="bottom-right" />
      <Navbar />
      {showLogin && <Login />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
