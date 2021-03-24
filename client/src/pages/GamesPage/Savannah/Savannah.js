import React, { useState, useEffect } from "react";
import "./Savannah.scss";
import {RS_LANG_API} from '../../../services/rs-lang-api'

import { useDispatch, useSelector } from "react-redux";
import {
  setIsGameStarted,
  setActiveCard,
  setCardsForSelection,
  guessTheWord,
  notGuessTheWord,
  setDefaultValues,
} from "../../../redux/savannah-reducer";

export const Savannah = () => {
  const dispatch = useDispatch();
  const isGameStarted = useSelector(
    (store) => store.savannahStore.isGameStarted
  );
  const activeCard = useSelector((store) => store.savannahStore.activeCard);
  const cardsForSelection = useSelector(
    (store) => store.savannahStore.cardsForSelection
  );
  const isGameWon = useSelector((store) => store.savannahStore.isGameWon);
  const isGameLost = useSelector((store) => store.savannahStore.isGameLost);
  const livesArray = useSelector((store) => store.savannahStore.livesArray);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(setActiveCard());
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [isGameStarted, activeCard]);
    useEffect(() => {
      if (activeCard) {
        const audio = new Audio();
        audio.src = `${RS_LANG_API}${activeCard.audio}`;
        audio.play();
      }
  }, [activeCard]);

  const startGame = () => {
    dispatch(setDefaultValues());
    dispatch(setIsGameStarted(!isGameStarted));
    dispatch(setActiveCard());
    dispatch(setCardsForSelection());
  };

  const handleCardClick = (event, word) => {
    if (word.id === activeCard.id) {
      dispatch(guessTheWord());
      if (!isGameWon) {
        dispatch(setActiveCard());
        dispatch(setCardsForSelection());
      }
    } else {
      dispatch(notGuessTheWord());
      if (!isGameLost) {
        dispatch(setActiveCard());
        dispatch(setCardsForSelection());
      }
    }
    console.log(word);
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
