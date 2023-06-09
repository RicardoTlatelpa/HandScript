import React from 'react';

const App = () => {
    return(
        <>
        <h1> HandScript </h1>
        <MyCanvas/>
        </>
    )
}

const MyCanvas = () => {
    return(
        <canvas id = "myCanvas" width = "500" height = "300" style={{border:"1px solid #000000"}}></canvas>
    )
}

export default App;