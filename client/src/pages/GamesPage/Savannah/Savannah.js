import React, { useState, useEffect } from "react";
import "./Savannah.scss";
import {RS_LANG_API} from '../../../services/rs-lang-api'

import { GAME_DEFAULT_VALUES } from "../../../shared/games-config";
import { wordsMockData } from "../../../shared/wordsMockData";

export const Savannah = () => {
  const [isGameStarted, setIsGameStarted] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameWon, setIsGameWon] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameLost, setIsGameLost] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [livesArray, setLivesArray] = useState(GAME_DEFAULT_VALUES.LIVES_ARRAY);
  const [wordsArray, setWordsArray] = useState(wordsMockData);
  const [remainWordsArray, setRemainWordsArray] = useState(wordsMockData);
  const [activeCard, setActiveCard] = useState();

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
    if (remainWordsArray.length) {
          setRandomActiveCardAndCardsForSelection();
        } else {
      setIsGameStarted(GAME_DEFAULT_VALUES.FALSE);
      setIsGameWon(GAME_DEFAULT_VALUES.TRUE);
      setActiveCard(null);
    }
  };

  const notGuessTheWord = () => {
    const remainLivesArray = [...livesArray];
    remainLivesArray.splice(0, 1);
    setLivesArray(remainLivesArray);
    if (!remainLivesArray.length) {
      setIsGameStarted(GAME_DEFAULT_VALUES.FALSE);
      setIsGameLost(GAME_DEFAULT_VALUES.TRUE);
      setActiveCard(null);
    }
  };

  return (
    <div className="savannah-container">
      <h2>Savannah</h2>
      {isGameWon && <div className="win-screen">WIN</div>}
      {isGameLost && <div className="lost-screen">LOST</div>}
      {!isGameStarted && <button onClick={startGame}>Start</button>}
      {isGameStarted && (
        <div className="lives-container">
          {livesArray.map((live) => {
            return <div>X</div>;
          })}
        </div>
      )}
      {isGameStarted && (
        <div className="savannah-card_active activeCardFall">{activeCard.word}</div>
      )}
      {isGameStarted && (
        <div className="selection-container">
          {cardsForSelection.map((word) => {
            return (
              <div
                key={word.id}
                onClick={(event) => handleCardClick(event, word)}
                className="savannah-card"
              >
                {word.wordTranslate}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
