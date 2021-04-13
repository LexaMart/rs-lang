import React from 'react';
import { useSelector } from 'react-redux';
import { RS_LANG_API } from '../../services/rs-lang-api';
import 'materialize-css';
import './WordCard.scss';

const WordCard = (element, hard) => {
    const userHardWords = useSelector((store) => store.authStore.userHardWords);
    const userLearningWords = useSelector((store) => store.authStore.userLearningWords);
    return (
        <div className='word_card'>
            <img src={RS_LANG_API + element.element.image} alt="wordimage" className='word_card_bg' />
            <div className='word'>{element.element.word.toLowerCase()}</div>
            {userHardWords.includes(element.element.id) && (<i className="material-icons red-text word_card-hard">warning</i>)}
            {userLearningWords.includes(element.element.id) && (<i className="material-icons green-text word_card-hard">done_outline</i>)}
        </div>
    )
}

export default WordCard;