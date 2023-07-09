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

  const unicode = {
    'A': '0x0041',
    'B': '0x0042',
    'C': '0x0043',
    'D': '0x0044',
    'E': '0x0045',
    'F': '0x0046',
    'G': '0x0047',
    'H': '0x0048',
    'I': '0x0049',
    'J': '0x004A',
    'K': '0x004B',
    'L': '0x004C',
    'M': '0x004D',
    'N': '0x004E',
    'O': '0x004F',
    'P': '0x0050',
    'Q': '0x0051',
    'R': '0x0052',
    'S': '0x0053',
    'T': '0x0054',
    'U': '0x0055',
    'V': '0x0056',
    'W': '0x0057',
    'X': '0x0058',
    'Y': '0x0059',
    'Z': '0x005A',
    'a': '0x0061',
    'b': '0x0062',
    'c': '0x0063',
    'd': '0x0064',
    'e': '0x0065',
    'f': '0x0066',
    'g': '0x0067',
    'h': '0x0068',
    'i': '0x0069',
    'j': '0x006A',
    'k': '0x006B',
    'l': '0x006C',
    'm': '0x006D',
    'n': '0x006E',
    'o': '0x006F',
    'p': '0x0070',
    'q': '0x0071',
    'r': '0x0072',
    's': '0x0073',
    't': '0x0074',
    'u': '0x0075',
    'v': '0x0076',
    'w': '0x0077',
    'x': '0x0078',
    'y': '0x0079',
    'z': '0x007A'
  }

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






