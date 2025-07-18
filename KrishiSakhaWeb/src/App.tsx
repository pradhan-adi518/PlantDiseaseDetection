import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Router,Route, Navigate, Routes } from 'react-router-dom';
import Service from './components/Services';

import UserLoginPage from './users/Login';
import SignUp from './users/SignUp';
import OTPVerification from './users/OtpScreen';
import HomePage from './users/Home';
import FirstPage from './components/FirstPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to="/login" replace />} />
            <Route path='/login' element={<UserLoginPage/>}></Route>
            <Route path='/service' element={<Service></Service>}/>
            <Route path='/register' element={<SignUp></SignUp>}/>
            <Route path='/otp' element={<OTPVerification></OTPVerification>}/>
            <Route path='/home' element ={<HomePage></HomePage>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
