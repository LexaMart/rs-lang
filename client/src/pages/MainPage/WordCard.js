import React from 'react';
import 'materialize-css';
import './WordCard.css';

const WordCard = ( element ) => {
    const adress ='https://react-learnwords-example.herokuapp.com/';
    return (
        <div className='word_card'>
            <img src={adress + element.element.image} alt="wordimage" className='word_card_bg' />
            <div className='word'>{element.element.word.toLowerCase()}</div>
        </div>
    )
}

export default WordCard;    