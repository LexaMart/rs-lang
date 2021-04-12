import React from 'react';
import { useSelector } from 'react-redux';
import 'materialize-css';
import './WordCard.scss';

const WordCard = ( element, hard ) => {
    const adress ='https://rs-lang-74-api.herokuapp.com/';
    const userHardWords = useSelector((store) => store.authStore.userHardWords);
    return (
        <div className='word_card'>
            <img src={adress + element.element.image} alt="wordimage" className='word_card_bg' />
            <div className='word'>{element.element.word.toLowerCase()}</div>
            {userHardWords.includes(element.element.id) && (<i className="material-icons red-text word_card-hard">warning</i>)}
        </div>
    )
}

export default WordCard;    