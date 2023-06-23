import React, { useEffect, useRef, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setDrawingOrNot] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 3;

    const canvasElement = canvasRef.current;

    canvasElement.addEventListener('mousedown', startDrawing);
    canvasElement.addEventListener('mousemove', drawOnCanvas);
    canvasElement.addEventListener('mouseup', stopDrawing);

    return () => {
      canvasElement.removeEventListener('mousedown', startDrawing);
      canvasElement.removeEventListener('mousemove', drawOnCanvas);
      canvasElement.removeEventListener('mouseup', stopDrawing);
    };
  }, [isDrawing]);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    return { offsetX, offsetY };
  };

  const startDrawing = (event) => {
    const { offsetX, offsetY } = getCoordinates(event);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setDrawingOrNot(true);
  };

  const drawOnCanvas = (event) => {
    if (isDrawing) {
      const { offsetX, offsetY } = getCoordinates(event);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setDrawingOrNot(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={300}
      style={{ border: '1px solid #000000' }}
    ></canvas>
  );
};

export default Canvas;




