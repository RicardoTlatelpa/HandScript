import React from 'react';
import './CanvasButtons.css'

const FinishButton = ({onClick}) => {
    return <button id="finish-button" onClick={onClick}>Finish</button>;
};

export default FinishButton;