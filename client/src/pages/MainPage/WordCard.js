import React from 'react';
import { useSelector } from 'react-redux';
import { RS_LANG_API } from '../../services/rs-lang-api';
import 'materialize-css';
import './WordCard.scss';

const WordCard = (element, hard, key) => {
    const userHardWords = useSelector((store) => store.authStore.userHardWords);
    return (
        <div key={key} className='word_card'>
            <img src={RS_LANG_API + element.element.image} alt="wordimage" className='word_card_bg' />
            <div className='word'>{element.element.word.toLowerCase()}</div>
            {userHardWords.includes(element.element.id) && (<i className="material-icons red-text word_card-hard">warning</i>)}
        </div>
    )
}

export default WordCard;