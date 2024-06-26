import { useState } from 'react'
import { BrowserRouter, Router, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css'
import Dashboard from './Pages/Dashboard/Dashboard'
import Profile from './Pages/Profile/Profile'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import { Link } from 'react-router-dom';
import Notfound from './Pages/NotFound/Notfound';
import Register from './Pages/Register/Register';
import Header from './Components/Header';
import MyLaptops from './Pages/MyLaptops/MyLaptops';
import '@fortawesome/fontawesome-free/css/all.min.css';
import WelcomeHome from './Pages/WelcomeHome/WelcomeHome';
import { UserProvider } from './Components/UserContext';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <UserProvider>
          
            <Routes>
              <Route exact path="/" element={<WelcomeHome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Notfound />} />
              <Route path="/register" element={<Register />} />
              <Route path="/mylaptops" element={<MyLaptops />} />
              <Route path="/WelcomeHome" element={<WelcomeHome />} />
            </Routes>
           
        </UserProvider>

      </div>


    </>
  )
}

export default App
