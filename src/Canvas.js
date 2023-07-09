import React, {useEffect, useRef, useState} from 'react';
import { fabric } from 'fabric';
import ClearButton from './ClearButton';
import LetterPrompt from './LetterPrompt';
import './LetterPrompt.css'
import axios from 'axios';
const Canvas = () => {
  const alphabet = ['a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','k','K','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z']; 
  // const alphabet = ['a','b','c']; // for testing backend
  const [index, setIndex] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(alphabet[index]);
  const [svgArray, setSVG] = useState([]);
  const [usvgArray, setUSVG] = useState([]);

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

  const checkCase = (ch) =>{
    if (!isNaN(ch * 1)){
      return 'ch is numeric';
   }
    else {
      if (ch == ch.toUpperCase()) {
         return true;
      }
      if (ch == ch.toLowerCase()){
         return false;
      }
   }
  }

  const sendJsontoServer = (json) => {    
    axios.post('/handleLC', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response=>{
        console.log(response.data)
      })
      .catch(err=>{
        console.error(err);
      })
  }
  // //handles lower case alphabet letters
  // const sendSVGtoServer = (svg) => {
  //   // make a post request to server
  //   // 1. create file data for server
  //   const blob = new Blob([svg[0]], { type: 'image/svg+xml' });
  //   const formData = new FormData();
  //   formData.append('file', blob, `${alphabet[svg[1]]}.svg`);
  //   // 2. send data to server
  //   axios.post('/handleLC', formData)
  //   .then(response => {
  //     console.log(response.data); // Log the response from the server
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // }

  const letterToSVG = () => {
    console.log(svgArray, usvgArray);
    let lastSVG = '';
    if(canvasObjRef.current && index < alphabet.length){
      lastSVG = canvasObjRef.current.toSVG();
      canvasObjRef.current.clear();  
      if(checkCase(alphabet[index])){
        addUSVG(lastSVG);
      }else{
        addSVG(lastSVG);          
      }
      nextLetter(); // increments index
    }
    if(index === (alphabet.length-1)){
      console.log("finished")
      // 1. send svg files to server
      let lowercaseshipment = []
      let uppercaseshipment = []
      let filler =['','','','','',''];
      usvgArray.map(x => {
        return uppercaseshipment.push(x);
      })
      svgArray.map(x =>{
        return lowercaseshipment.push(x);
      })
      //lowercaseshipment.push(lastSVG); // for lower case tests
      uppercaseshipment.push(lastSVG);
      console.log(lowercaseshipment)
      console.log(uppercaseshipment)
      console.log(filler)
      uppercaseshipment = uppercaseshipment.concat(filler);
      uppercaseshipment = uppercaseshipment.concat(lowercaseshipment);            
      let json = {shipment: uppercaseshipment}
      console.log(json);
      sendJsontoServer(json);
    }
  };
  const addUSVG = (theSVG) => {
    setUSVG(prevSVGArray => [...prevSVGArray, theSVG]);
  }
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






