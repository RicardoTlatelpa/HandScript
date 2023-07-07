import React, {useEffect, useRef, useState} from 'react';
import { fabric } from 'fabric';
import ClearButton from './ClearButton';
import LetterPrompt from './LetterPrompt';
import './LetterPrompt.css'

const Canvas = () => {
  //const alphabet = ['a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','k','K','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z'];
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const [index, setIndex] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(alphabet[index]);
  const [svgArray, setSVG] = useState([]);

  const canvasRef = useRef(null);
  const canvasObjRef = useRef(null);

  useEffect(() => {
    canvasObjRef.current = new fabric.Canvas(canvasRef.current);
    return () => {
      canvasObjRef.current.dispose();
    };
  },[]);

  useEffect(() => {
    if(canvasObjRef.current){
      canvasObjRef.current.isDrawingMode = true;
      canvasObjRef.current.freeDrawingBrush.width = 5;
    }
  },[]);

  const letterToSVG = () => {
    if(canvasObjRef.current && index < alphabet.length){
      const svg = canvasObjRef.current.toSVG();
      canvasObjRef.current.clear();
      addSVG(svg);
      // make a post request to server
      
      nextLetter();
    }
  };

  const addSVG = (theSVG) => {
    setSVG(prevSVGArray => [...prevSVGArray, theSVG]);
  }

  const clearCanvas = () => {
    if(canvasObjRef.current){
      canvasObjRef.current.clear();
    }
  };

  const nextLetter = () => {
    let nextIndex = index + 1;
    setCurrentLetter(alphabet[nextIndex]);
    setIndex(nextIndex);
  };

  return(
    <div>
      <LetterPrompt currentLetter={currentLetter} />
      <canvas ref={canvasRef} width={"700"} height={"600"} style={{ border: '1px solid black' }} />
      <div>
        <ClearButton onClear={clearCanvas} />
        <button id="next-letter-button" onClick={letterToSVG}>Next Letter</button>
      </div>
    </div>
  );
};

export default Canvas;






