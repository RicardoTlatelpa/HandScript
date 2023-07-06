import React, { useState } from 'react';
import Canvas from './Canvas';
import ClearButton from './ClearButton';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import LetterPrompt from './LetterPrompt.js'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App () {
    return(
        <>
        <Router>
            <Navbar />
            <Routes>
            <Route exact path='/' element={<Home/>} />
            </Routes>
        </Router>
        <Canvas />
        </>
    )
}

export default App;