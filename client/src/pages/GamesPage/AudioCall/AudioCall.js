import React, { useState, useEffect } from "react";
import { RS_LANG_API } from "../../../services/rs-lang-api";
import { GAME_DEFAULT_VALUES } from "../../../shared/games-config";
import { wordsMockData } from "../../../shared/wordsMockData";
import { WORDS_CONFIG } from "../../../shared/words-config";
import { useSelector, useDispatch } from "react-redux";
import {
  setAudioCallLearnedWords,
  setAudioCallIncorrectAnswers,
  getStatistic,
} from "../../../redux/statistics-reducer";
import { sendStatistic } from "../GameUtilities/GameUtilities";
import "./audiocall.scss";
import "materialize-css";

export const AudioCall = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const optionalStatisticObject = useSelector(
    (store) => store.statisticsStore.statisticsData.optional
  );
  const wholeLearnedWords = useSelector(
    (store) => store.statisticsStore.learnedWords
  );
  const [numberOfLearnedWords, setNumberOfLearnedWords] = useState(0);
  const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);

  const [isGameStarted, setIsGameStarted] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameWon, setIsGameWon] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameLost, setIsGameLost] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [livesArray, setLivesArray] = useState(GAME_DEFAULT_VALUES.LIVES_ARRAY);
  const [wordsArray, setWordsArray] = useState(wordsMockData);
  const [remainWordsArray, setRemainWordsArray] = useState(wordsMockData);
  const [activeCard, setActiveCard] = useState();

  const [isImageShown, setIsImageShown] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [cardsForSelection, setCardsForSelection] = useState(null);

  useEffect(() => {
    if (activeCard) {
      playActiveCardAudio();
    }
  }, [activeCard]);

  const startGame = () => {
    setDefaultGameSettings();
    setIsGameStarted(!isGameStarted);
    setRandomActiveCardAndCardsForSelection();
    if (isAuthenticated) {
      dispatch(getStatistic(userId, token));
    }
  };

  const setDefaultGameSettings = () => {
    setWordsArray(wordsMockData);
    setRemainWordsArray(wordsMockData);
    setLivesArray(GAME_DEFAULT_VALUES.LIVES_ARRAY);
    setIsGameLost(GAME_DEFAULT_VALUES.FALSE);
    setIsGameWon(GAME_DEFAULT_VALUES.FALSE);
  };

  const getRandomValue = (value) => {
    return Math.floor(Math.random() * Math.floor(value));
  };

  const playActiveCardAudio = () => {
    const audio = new Audio();
    audio.src = `${RS_LANG_API}${activeCard.audio}`;
    audio.play();
  };

  const playActiveCardAudioMeaning = () => {
    const audio = new Audio();
    audio.src = `${RS_LANG_API}${activeCard.audioMeaning}`;
    audio.play();
  };

  const playActiveCardAudioExample = () => {
    const audio = new Audio();
    audio.src = `${RS_LANG_API}${activeCard.audioExample}`;
    audio.play();
  };

  const getRandomCardsForSelect = (activeCard) => {
    const arrayOfCardsForSelect = [...wordsArray].filter(
      (card) => card.id !== activeCard.id
    );

    //TODO
    const length = 3;
    const result = [];
    for (let i = 0; i < length; i++) {
      let index = getRandomValue(arrayOfCardsForSelect.length - 1);
      let curCard = arrayOfCardsForSelect[index];
      arrayOfCardsForSelect.splice(index, 1);
      result.push(curCard);
    }
    result.splice(Math.floor(Math.random() * Math.floor(3)), 0, activeCard);

    return result;
  };

  const handleCardClick = (event, word) => {
    word.id === activeCard.id ? guessTheWord() : notGuessTheWord();
  };

  const handleNextButtonClick = () => {
    if (remainWordsArray.length) {
      setRandomActiveCardAndCardsForSelection();
    }
    setIsImageShown(GAME_DEFAULT_VALUES.FALSE);
  };

  const setRandomActiveCardAndCardsForSelection = () => {
    const activeCardIndex = getRandomValue(remainWordsArray.length - 1);
    const remainWordsArrayForSelection = [...remainWordsArray];

    setActiveCard(remainWordsArray[activeCardIndex]);
    setCardsForSelection(() =>
      getRandomCardsForSelect(remainWordsArray[activeCardIndex])
    );
    remainWordsArrayForSelection.splice(activeCardIndex, 1);
    setRemainWordsArray(remainWordsArrayForSelection);
  };

  const guessTheWord = () => {
    setIsImageShown(GAME_DEFAULT_VALUES.TRUE);
    setNumberOfLearnedWords(numberOfLearnedWords + 1);
    if (!remainWordsArray.length) {
      setIsGameStarted(GAME_DEFAULT_VALUES.FALSE);
      setIsImageShown(GAME_DEFAULT_VALUES.FALSE);
      setIsGameWon(GAME_DEFAULT_VALUES.TRUE);
      setActiveCard(null);
      dispatch(setAudioCallLearnedWords(numberOfLearnedWords));
      dispatch(setAudioCallIncorrectAnswers(numberOfIncorrectAnswers));
      sendStatistic(
        isAuthenticated,
        userId,
        token,
        wholeLearnedWords,
        optionalStatisticObject,
        numberOfLearnedWords,
        numberOfIncorrectAnswers
      );
    }
  };

  const notGuessTheWord = () => {
    const remainLivesArray = [...livesArray];
    remainLivesArray.splice(0, 1);
    setLivesArray(remainLivesArray);
    setNumberOfIncorrectAnswers(numberOfIncorrectAnswers + 1);
    if (!remainLivesArray.length) {
      setIsGameStarted(GAME_DEFAULT_VALUES.FALSE);
      setIsImageShown(GAME_DEFAULT_VALUES.FALSE);
      setIsGameLost(GAME_DEFAULT_VALUES.TRUE);
      setActiveCard(null);
      dispatch(setAudioCallLearnedWords(numberOfLearnedWords));
      dispatch(setAudioCallIncorrectAnswers(numberOfIncorrectAnswers));
      sendStatistic(
        isAuthenticated,
        userId,
        token,
        wholeLearnedWords,
        optionalStatisticObject,
        numberOfLearnedWords,
        numberOfIncorrectAnswers
      );
    }
  };

  // function createMarkup() {
  //   return {__html: activeCard.textExampleTranslate};
  // }

  return (
    <div className="savannah-container">
      <h2>AudioCall</h2>
      {!isGameStarted && (
        <>
          <div className="rules">
            In this game you should choose correct translation of audio that you
            listen
          </div>
          <button className="btn red" onClick={startGame}>
            {!isGameLost ? "Start" : "Retry"}
          </button>
        </>
      )}
      {isGameWon && <div className="win-screen">WIN</div>}
      {isGameLost && <div className="lost-screen">LOST</div>}
      {isGameStarted && (
        <>
          <div className="lives-container">
            <div>
              <i className="material-icons">favorite </i> x {livesArray.length}
            </div>
          </div>
          <div>
            {isImageShown && (
              <>
                <div className="white-text word_text">
                  {activeCard.transcription}
                </div>
                <button className="btn play" onClick={playActiveCardAudio}>
                  <i className="material-icons">volume_up </i>
                </button>
                <img
                  className="correct_word_image"
                  src={`${RS_LANG_API}${activeCard.image}`}
                  alt="word_image"
                />
                <div className="white-text word_text">
                  {activeCard.textMeaning.replace(/<\/?[^>]+(>|$)/g, '')}
                </div>
                <button
                  className="btn play"
                  onClick={playActiveCardAudioMeaning}
                >
                  <i className="material-icons">volume_up </i>
                </button>
                <div className="white-text word_text" dangerouslySetInnerHTML={{__html: activeCard.textExampleTranslate}}>   
                </div>
                <div className="white-text word_text" dangerouslySetInnerHTML={{__html: activeCard.textExample}}>
                  {/* {activeCard.textExample} */}
                </div>
                <button
                  className="btn play"
                  onClick={playActiveCardAudioExample}
                >
                  <i className="material-icons">volume_up </i>
                </button>
                <div className="white-text word_text">
                  {activeCard.textMeaningTranslate}
                </div>
              </>
            )}
          </div>
          <button className="btn" onClick={handleNextButtonClick}>
            Next
          </button>
          <div
            className={
              isImageShown
                ? "selection-audio-container-end"
                : "selection-audio-container"
            }
          >
            {cardsForSelection.map((word) => {
              return (
                <div
                  key={word.id}
                  onClick={(event) => handleCardClick(event, word)}
                  className="btn red audiocall-card"
                >
                  {word.wordTranslate}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
