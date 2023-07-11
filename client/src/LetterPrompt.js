import React from 'react';

const LetterPrompt = ({currentLetter}) => {
        return(
            <div>
                <p id = "letter-prompt">Write the letter <span id="changing-letter">{currentLetter}</span> on the canvas below. Make sure to click "Next Letter" at the end to download the file!</p>
            </div>
        );
}

export default LetterPrompt