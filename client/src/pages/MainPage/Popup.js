import React from 'react';
import { useSelector } from 'react-redux';
import audioImage from '../../assets/images/audio.svg';
import 'materialize-css';
import './popup.scss';

const Popup = ({ active, setActive, currElement }) => {
    const adress ='https://rs-lang-74-api.herokuapp.com/';
    const isTranslationShown = useSelector((store) => store.settingsStore.isTranslationShown);
    const isAdditionalButtonsShown = useSelector((store) => store.settingsStore.isAdditionalButtonsShown);
    const playAudio = () => {
        const audio = new Audio();
        audio.src = `${adress}${currElement.audio}`;
        audio.play();
      };
    return (
        <div className={active ? "popup popup_active" : "popup"} onClick={() => setActive(false)}>
            <div className={active ? "popup_content popup_active" : "popup_content"} onClick={e => e.stopPropagation()}>
                <div className="word_text">{currElement.word.toUpperCase()}</div>
                <div className="info_container">
                    <div className="text_container">
                    <div>
                        <div className="word_transcript"><b>Transcription:</b> {currElement.transcription}</div>
                        <div className ={isTranslationShown ? "word_translate" : "hide"}><b>Translation:</b> {currElement.wordTranslate}</div>
                        <div className="text_meaning"><b>Word Meaning:</b> {currElement.textMeaning.replace(/<\/?[^>]+(>|$)/g, "")}</div>
                        <div className={isTranslationShown ? "text_meaning_translation" : "hide"}><b>Translation:</b> {currElement.textMeaningTranslate}</div>
                        <div className="text_example"><b>Word usage example:</b> {currElement.textExample.replace(/<\/?[^>]+(>|$)/g, "")}</div>
                        <div className={isTranslationShown ? "text_example_translation" : "hide"}><b>Translation:</b> {currElement.textExampleTranslate}</div>
                    </div>
                </div>
                <div className ="image_container"><img src={adress + currElement.image} alt="wordimage" className='popup_card_bg' /></div>
                </div>
                <div className="audio_container" onClick ={() => playAudio()}><img src={audioImage} alt="audio" className="audio_image"></img></div>
                <div className ={isAdditionalButtonsShown ? "button_container" : "hide"}>
                    <button className="btn">Difficult</button>
                    <button className="btn">Delete</button>
                    <button className="btn">Known</button>
                </div>
            </div>
        </div>
    )
}

export default Popup;