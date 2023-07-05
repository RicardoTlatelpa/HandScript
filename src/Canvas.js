import React, {useEffect, useRef, useState} from 'react';
import { fabric } from 'fabric';
import ClearButton from './ClearButton';
import LetterPrompt from './LetterPrompt';
import FinishButton from './FinishButton';
import axios from 'axios';
import './LetterPrompt.css'

const Canvas = () => {
  const alphabet = ['a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','k','K','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z'];
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

  const svgArrayToBackEnd = async(theSVGArray) => {
    try{
      const response = await axios.post('/api/svgArray', { theSVGArray: svgArray });
      console.log(response.data);
    }catch(error){
      console.error(error);
    }
  }

  return(
    <div>
      <LetterPrompt currentLetter={currentLetter} />
      <canvas ref={canvasRef} width={"700"} height={"600"} style={{ border: '1px solid black' }} />
      <div>
        <ClearButton onClear={clearCanvas} />
        <button id="next-letter-button" onClick={letterToSVG}>Next Letter</button>
        <FinishButton onClick={ () => svgArrayToBackEnd(svgArray)}></FinishButton>
      </div>
    </div>
  );
};

export default Canvas;






