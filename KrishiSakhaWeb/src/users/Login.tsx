import React, { useState } from 'react';
import { ToastContainer,toast,ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiSerice, setJwt, setUsername, username } from '../utils/Axios';
import { log } from 'console';
import { useNavigate } from 'react-router-dom';
import { url } from 'inspector';

const UserLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate()

  const handleLogin = async () => {
    if(email=="" || password == ""){
        toast.error('🚨 Please fill out all fields!', {
            position: "top-center",
            autoClose: 3000,
          });
        return
    }
    
    try{
        let res = await apiSerice.post('public/login',{
            username:email,
            password: password
        })
        setUsername(email)
        setJwt(res.data.jwt)
        console.log(username);
        
       navigate("/home")
    }catch(e){
        toast.error('invalid credentials!', {
            position: "top-center",
            autoClose: 3000,
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      backgroundImage:"url('/background.webp')"
    }}>
      {/* Main Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/3 w-11/12">
        {/* Logo */}
        <div className="text-center">
          <img
            src="/logo.webp" // Replace with your logo URL
            alt="Farm Logo"
            className="w-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-green-600">Welcome to KrishiSakha</h1>
          <p className="text-gray-600 text-sm">Sign in to continue</p>
        </div>

        {/* Form */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          />

          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium transition-all"
          >
            Log In
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/register" className="text-green-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default UserLoginPage;
