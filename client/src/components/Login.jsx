import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios'
import { toast } from 'react-toastify';
const Login = () => {
    const [state, setState] = useState('Login');
    const { setShowLogin,backendUrl,setToken ,setUser} = useContext(AppContext);

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
     
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (state === 'Login') {
                response = await axios.post(backendUrl + '/api/user/login', { email, password });
            } else {
                response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
            }
    
            const data = response.data;
    
            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);  // ✅ Store token in local storage
                setUser(data.user);
                setShowLogin(false);
    
                // Reload the page to apply the changes
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };
    
    





    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className=' fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            {/* Form with Fade-in Animation */}
            <motion.form onSubmit={onSubmitHandler}
                className='relative bg-white p-10 rounded-xl text-slate-500 w-[90%] max-w-sm'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p className='text-sm'>You're back! Log in to pick up where you left off.</p>

                {state !== 'Login' && (
                    <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <img src={assets.profile_icon} className="w-5 h-5"alt='User Icon' />
                        <input onChange={e=>setName(e.target.value)}value={name}type="text" name="fullName" className='outline-none text-sm w-full' placeholder='Full Name' required />
                    </div>
                )}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.email_icon} alt='Email Icon' />
                    <input onChange={e=>setEmail(e.target.value)}value={email}type="email" name="email" className='outline-none text-sm w-full' placeholder='Email id' required />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt='Lock Icon' />
                    <input onChange={e=>setPassword(e.target.value)}value={password}type="password" name="password" className='outline-none text-sm w-full' placeholder='Password' required />
                </div>

                <p className='text-sm text-blue-600 my-4 cursor-pointer hover:underline'>Forgot password?</p>

                {/* Animated Button */}
                <motion.button 
                     type="submit"  
                    className='bg-blue-600 w-full text-white py-2 rounded-full transition-all hover:bg-blue-700'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                     >
                       {state === 'Login' ? 'Login' : 'Create Account'}
                      </motion.button>


                {/* Toggle Between Login & Sign Up */}
                {state === 'Login' ? (
                    <p className='mt-5 text-center'>
                        Don't have an account? 
                        <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => setState('Sign Up')}> Sign Up</span>
                    </p>
                ) : (
                    <p className='mt-5 text-center'>
                        Already have an account? 
                        <span className='text-blue-600 cursor-pointer hover:underline' onClick={() => setState('Login')}> Login</span>
                    </p>
                )}

                {/* Close Button */}
                <motion.img 
                    onClick={() => setShowLogin(false)} 
                    src={assets.cross_icon} 
                    alt='Close' 
                    className='absolute top-5 right-5 cursor-pointer w-5 h-5 transition-transform hover:scale-110'
                    whileHover={{ rotate: 90 }}
                />
            </motion.form>
        </div>
    );
};

export default Login;
