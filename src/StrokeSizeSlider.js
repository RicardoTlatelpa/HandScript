import React from 'react';
import './StrokeSizeSlider.css'

const StrokeSizeSlider = ({value, onStrokeChange}) => {
  return (
    <div>
        <label id="stroke-size-text">Stroke Size:</label>
        <input id="stroke-size-slider" type="range" min="1" max="25" value={value} onChange={onStrokeChange}/>
    </div>
  );
};

export default StrokeSizeSlider;