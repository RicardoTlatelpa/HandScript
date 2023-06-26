import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import ClearButton from './ClearButton';


const Canvas = () => {
  const canvasRef = useRef(null);
  let canvas;
  useEffect(() => {
    canvas = new fabric.Canvas(canvasRef.current);
    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if(canvas) {
      canvas.isDrawingMode = true;
    }
    canvas.freeDrawingBrush.width = 5;
  },[]);

  const letterToSVG = () => {
    if(canvas) {
      const svg = canvas.toSVG();
      console.log(svg);
      canvas.clear();
    }
  };

  const clearCanvas = () => {
    if(canvas) {
      canvas.clear();
    }
  };
  

  return(
    <div>
      <canvas ref={canvasRef} width={"700"} height={"600"} style={{ border: '1px solid black'}} />
      <div>
        <ClearButton onClear={clearCanvas} />
        <button onClick={letterToSVG}>Next Letter</button>
      </div>
    </div>
  );
};

export default Canvas;






