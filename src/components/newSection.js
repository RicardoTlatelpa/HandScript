import React from 'react';
import '../App.css';
import { Button } from './Button';
import './newSection.css';

function newSection(){
    return (
        <div className='new-Section'>
            <video src="/videos/video2.mp4" autoPlay loop muted />
            <h1>Create your own handwriting</h1>
            <p>ARE YOU READY TO WRITE?</p>
            <div className= "newSection-btns">
                <Button className = 'btns' buttonStyle='btn--outline'
                buttonSize='btn--large'>HANDSCRIPT!
                </Button>
            </div>
        </div>
    )
}

export default newSection;