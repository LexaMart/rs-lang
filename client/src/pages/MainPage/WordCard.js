import React from 'react';
import 'materialize-css';
import './WordCard.scss';

const WordCard = ( element ) => {
    const adress ='https://rs-lang-74-api.herokuapp.com/';
    return (
        <div className='word_card'>
            <img src={adress + element.element.image} alt="wordimage" className='word_card_bg' />
            <div className='word'>{element.element.word.toLowerCase()}</div>
        </div>
    )
}

export default WordCard;    