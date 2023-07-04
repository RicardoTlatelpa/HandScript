import React, { useState } from 'react';
import Canvas from './Canvas';
import ClearButton from './ClearButton';
import Navbar from './components/Navbar';
import LetterPrompt from './LetterPrompt.js'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

const App = () => {
    return(
        <>
        <Router>
            <Navbar />
            <Routes>
                <Route path ="/home" element ={<home/>} />
            </Routes>
        </Router>
        <Canvas />
        </>
    )
}

export default App;