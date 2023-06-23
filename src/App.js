import React, { useState } from 'react';
import Canvas from './Canvas';
import ClearButton from './ClearButton';

const App = () => {
    const [clearCanvas, setClearCanvas] = useState(false);
    const handleClearCanvas = () => {
        console.log("handled");
        setClearCanvas(!clearCanvas);
    };

    return(
        <>
        <h1> HandScript </h1>
        <Canvas clearCanvas={clearCanvas} />
        <div>
        <ClearButton onClear={handleClearCanvas}>Clear</ClearButton>
        </div>
        </>
    )
}

export default App;