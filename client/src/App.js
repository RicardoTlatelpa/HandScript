import React, { useState } from 'react';
import Canvas from './Canvas';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import GetStarted from './components/pages/GetStarted';
import About from './components/pages/About';
import SignUp from './components/pages/SignUp';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App () {
    return(
        <>
        <Router>
            <Navbar />
            <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route exact path='/getstarted' element={<GetStarted/>} />
            <Route exact path='/about' element={<About/>} />
            <Route exact path='/sign-up' element={<SignUp/>} />
            </Routes>
        </Router>
        </>
    )
}

export default App;