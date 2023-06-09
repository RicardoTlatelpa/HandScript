import React from 'react';

const App = () => {
    return(
        <>
        <h1> HandScript </h1>
        <MyCanvas/>
        <WriteLetterPrompt/>
        </>
    )
}

const MyCanvas = () => {
    return(
        <canvas id = "myCanvas" width = "500" height = "300" style={{border:"1px solid #000000"}}></canvas>
    )
}

//Not yet finished need to change it so every time the user finishes writing a letter it moves to next letter. Maybe add a next letter button?
const WriteLetterPrompt = () => {
    const alphabet = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H' , 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', "Y", 'z', 'Z'];
    for(let i = 0; i < alphabet.length - 1; i++){
        let letter = alphabet[i];
        return(
        <p id = "write-letter-prompt"> Write the letter: {letter}</p>
        )
    }
}

export default App;