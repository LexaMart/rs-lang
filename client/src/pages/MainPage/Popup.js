import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addDeletedWord,
  addHardWord,
  addLearningWord,
  removeDeletedWord,
  removeHardWord,
} from '../../redux/auth-reducer';
import { rsLangApi, RS_LANG_API } from '../../services/rs-lang-api';
import {
  WORDS_CATEGORIES,
  LANGUAGE_CONFIG,
  WORDS_CONFIG,
} from '../../shared/words-config';
import audioImage from '../../assets/images/audio.svg';
import 'materialize-css';
import './popup.scss';

const Popup = ({
  active,
  setActive,
  currElement,
  isDeleted = false,
  pageRender,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const userHardWords = useSelector((store) => store.authStore.userHardWords);
  const userLearningWords = useSelector((store) => store.authStore.userLearningWords);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const isTranslationShown = useSelector(
    (store) => store.settingsStore.isTranslationShown
  );
  const isAdditionalButtonsShown = useSelector(
    (store) => store.settingsStore.isAdditionalButtonsShown
  );
  const language = useSelector((store) => store.settingsStore.activeLanguage);

  const popupBtnHandler = (action) => {
    if (isAuthenticated) {
      rsLangApi.postUserWord(token, userId, currElement.id, action);
      action === WORDS_CATEGORIES.deleted
        ? dispatch(addDeletedWord(currElement.id))
        : action === WORDS_CATEGORIES.hard
        ? dispatch(addHardWord(currElement.id))
        : dispatch(addLearningWord(currElement.id));
    } else {
    }
  };

  const recoverBtnHandler = async () => {
    await rsLangApi.removeUserDeleted(token, userId, currElement.id);
    setActive(!active);
    pageRender(true);
    dispatch(removeDeletedWord(currElement.id));
    dispatch(removeHardWord(currElement.id));
  };

  const playAudio = () => {
    const audio = new Audio();
    audio.src = `${RS_LANG_API}${currElement.audio}`;
    audio.play();
  };

  const playAudio1 = () => {
    const audio1 = new Audio();
    audio1.src = `${RS_LANG_API}${currElement.audioMeaning}`;
    audio1.play();
  };

  const playAudio2 = () => {
    const audio2 = new Audio();
    audio2.src = `${RS_LANG_API}${currElement.audioExample}`;
    audio2.play();
  };

  return (
    <div
      className={active ? 'popup popup_active' : 'popup'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'popup_content popup_active' : 'popup_content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="word_text">{currElement.word.toUpperCase()}</div>
        <div className="info_container">
          <div className="popup_text_container">
            <div>
              <div className="word_transcript">
                <b>
                  {language === LANGUAGE_CONFIG.foreign
                    ? WORDS_CONFIG.POPUP_TRANSCRIPTION.foreign
                    : WORDS_CONFIG.POPUP_TRANSCRIPTION.native}
                  :
                </b>{' '}
                {currElement.transcription}
              </div>
              <div className={isTranslationShown ? 'word_translate' : 'hide'}>
                <b>
                  {language === LANGUAGE_CONFIG.foreign
                    ? WORDS_CONFIG.POPUP_TRANSLATION.foreign
                    : WORDS_CONFIG.POPUP_TRANSLATION.native}
                  :
                </b>{' '}
                {currElement.wordTranslate}
              </div>
              <div>
                <b>
                  {language === LANGUAGE_CONFIG.foreign
                    ? WORDS_CONFIG.POPUP_WORD_MEANING.foreign
                    : WORDS_CONFIG.POPUP_WORD_MEANING.native}
                  :{' '}
                </b>
                <span
                  dangerouslySetInnerHTML={{ __html: currElement.textMeaning }}
                  className="text_meaning"
                ></span>
              </div>
              <div
                className={
                  isTranslationShown ? 'text_meaning_translation' : 'hide'
                }
              >
                <b>
                  {language === LANGUAGE_CONFIG.foreign
                    ? WORDS_CONFIG.POPUP_TRANSLATION.foreign
                    : WORDS_CONFIG.POPUP_TRANSLATION.native}
                  :
                </b>{' '}
                {currElement.textMeaningTranslate}
              </div>
              <div className="text_example">
                <b>
                  {language === LANGUAGE_CONFIG.foreign
                    ? WORDS_CONFIG.POPUP_WORD_USAGE.foreign
                    : WORDS_CONFIG.POPUP_WORD_USAGE.native}
                  :{' '}
                </b>
                <span
                  dangerouslySetInnerHTML={{ __html: currElement.textExample }}
                  className="text_meaning"
                ></span>
              </div>
              <div
                className={
                  isTranslationShown ? 'text_example_translation' : 'hide'
                }
              >
                <b>
                  {language === LANGUAGE_CONFIG.foreign
                    ? WORDS_CONFIG.POPUP_TRANSLATION.foreign
                    : WORDS_CONFIG.POPUP_TRANSLATION.native}
                  :
                </b>{' '}
                {currElement.textExampleTranslate}
              </div>
            </div>
          </div>
          <div className="image_container">
            <img
              src={RS_LANG_API + currElement.image}
              alt="wordimage"
              className="popup_card_bg"
            />
          </div>
        </div>
        <div className="audio_container">
          <div className="audio_btn">
            <img
              img
              src={audioImage}
              alt="audio"
              className="audio_image"
              onClick={() => playAudio()}
            />
          </div>
          <div className="audio_btn">
            <img
              img
              src={audioImage}
              alt="audio"
              className="audio_image"
              onClick={() => playAudio1()}
            />
          </div>
          <div className="audio_btn">
            <img
              img
              src={audioImage}
              alt="audio"
              className="audio_image"
              onClick={() => playAudio2()}
            />
          </div>
        </div>
        <div className={isAdditionalButtonsShown && !(userLearningWords.includes(currElement.id)) ? 'button_container' : 'hide'}>
          {!isDeleted ? (
            <React.Fragment>
              <button onClick={() => popupBtnHandler('hard')} className="btn">
                {language === LANGUAGE_CONFIG.foreign ? 'Difficult' : 'сложное'}
              </button>
              <button
                onClick={() => popupBtnHandler('deleted')}
                className="btn"
              >
                {language === LANGUAGE_CONFIG.foreign ? 'Delete' : 'Удаление'}
              </button>
              <button
                onClick={() => popupBtnHandler('learned')}
                className="btn"
              >
                {language === LANGUAGE_CONFIG.foreign ? 'Known' : 'Изученное'}
              </button>
            </React.Fragment>
          ) : (
            <button onClick={() => recoverBtnHandler()} className="btn">
              {language === LANGUAGE_CONFIG.foreign
                ? 'Recover'
                : 'Восстановление'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
