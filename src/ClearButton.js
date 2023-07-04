import React from 'react';
import './CanvasButtons.css'

const ClearButton = ({ onClear }) => {
    return <button id="clear-button" onClick={onClear}>Clear</button>;
};

export default ClearButton;