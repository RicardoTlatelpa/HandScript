import React from 'react';

const LetterPrompt = ({currentLetter}) => {
        return(
            <div>
                <p id = "letter-prompt">Write the letter <span id="changing-letter">{currentLetter}</span> on the canvas below. Make sure to click finished when done with all letters!</p>
            </div>
        );
}

export default LetterPrompt