import React, {useEffect, useRef, useState} from 'react';
import { fabric } from 'fabric';
import ClearButton from './ClearButton';
import LetterPrompt from './LetterPrompt';
import StrokeSizeSlider from './StrokeSizeSlider';
import axios from 'axios';
import { Canvg } from 'canvg';
import './LetterPrompt.css'
import './Canvas.css'

const Canvas = () => {
  // canvas page states  
  const alphabet = ['a'];
  //const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];   
  const [index, setIndex] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(alphabet[index]);
  const [svgArray, setSVG] = useState([]);
  const [strokeSize, setStrokeSize] = useState('');
  const [usvgArray, setUSVG] = useState([]);  
  const canvasRef = useRef(null);
  const canvasObjRef = useRef(null);
  
  // variable definitions
  //const alphabet = ['a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','k','K','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z']; 
  
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
  
  // helper function
  const checkCase = (ch) =>{
    // returns true if uppercase, false if lowercase
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
  
  // API functionalities
  const sendJsontoServer = async(json) => {    
    return await axios.post('/handleLC', json, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    })
  }

  const handleServerPost = async(lastSVG) =>{    
      // 1. send svg files to server
      let lowercaseshipment = []
      let uppercaseshipment = []
      
      usvgArray.map(x => {
        return uppercaseshipment.push(x);
      })
      svgArray.map(x =>{
        return lowercaseshipment.push(x);
      })
      lowercaseshipment.push([lastSVG, unicode[alphabet[index]]]); // for lower case tests
      // const filler = [['','5'],['','6'],['','4'],['','3'],['','2'],['','1']]      
      // uppercaseshipment.push([lastSVG, unicode[alphabet[index]]]);            
      // uppercaseshipment = uppercaseshipment.concat(filler);
      // uppercaseshipment = uppercaseshipment.concat(lowercaseshipment);            
      let json = {shipment: lowercaseshipment}
      console.log(json);
      const results = await sendJsontoServer(json); 
      const blob = new Blob([results.data], {type: 'font/ttf'})
      let hidden_a = document.createElement('a');
      hidden_a.href = window.URL.createObjectURL(blob);
      hidden_a.setAttribute('download', 'HandScripts.ttf');
      document.body.appendChild(hidden_a);
      hidden_a.click();
  }

  const isCanvasBlank = () =>{
    const canvas = document.getElementById("canvas");
    return !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data
      .some(channel => channel !== 0);
  }

  const letterToSVG = async () => {
    //console.log(svgArray, usvgArray); //logging the svg array states
    let lastSVG = '';        
    if(isCanvasBlank() === false && index < alphabet.length){      
      const uni = unicode[alphabet[index]]
      lastSVG = canvasObjRef.current.toSVG();
      canvasObjRef.current.clear();        
      if(checkCase(alphabet[index])){
        addUSVG(lastSVG,uni);
      }else{
        addSVG(lastSVG,uni);          
      }      
      if(index === (alphabet.length-1)){
        // lock canvas --> handle server post
        await handleServerPost(lastSVG);
      } 
      nextLetter(); // increments index
    }   
    
  };
  
  const addUSVG = (theSVG,unicode) => {
    setUSVG(prevSVGArray => [...prevSVGArray, [theSVG,unicode]]);
  }
  const addSVG = (theSVG,unicode) => {
    setSVG(prevSVGArray => [...prevSVGArray, [theSVG,unicode]]);
  }

  // Canvas functionalities

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


  const changeStrokeSize = (e) => {
    const userStrokeSize = Number(e.target.value);
    setStrokeSize(userStrokeSize);
    canvasObjRef.current.freeDrawingBrush.width = userStrokeSize;
  }

  return(
    <div>
      <div id="canvas-div">
        <LetterPrompt currentLetter={currentLetter} />
        <canvas id="canvas" ref={canvasRef} width={"1000"} height={"550"} style={{ border: '1px solid #DCDCDC', borderRadius: 
        '10px', boxShadow: "1px 1px 4px #888888"}}/>
        <div id="canvas-button-div">
          <ClearButton onClear={clearCanvas} />
          <button id="next-letter-button" onClick={letterToSVG}>Next Letter</button>
          <StrokeSizeSlider onStrokeChange={changeStrokeSize}/>
        </div>
      </div>
    </div>
  );
};

export default Canvas;






