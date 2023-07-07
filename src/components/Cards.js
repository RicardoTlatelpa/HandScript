import React from 'react'
import CardItems from './CardItems';
import './Cards.css';

function Cards() {
  return (
    <div className= 'cards'>
        <h1>Transform your handwriting into a font!</h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <CardItems
                    src="images/smile1.gif"
                    text="Handscript let's you create your own font whenever you want!"
                    label = 'Fonts'
                    path ='/About'
                    />
                </ul>
            </div>
        </div>

    </div>
  );
}

export default Cards;