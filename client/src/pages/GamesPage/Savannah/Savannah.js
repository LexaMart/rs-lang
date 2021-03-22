import React, { useState } from "react";
import "./Savannah.css";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsGameStarted,
  setActiveCard,
  setCardsForSelection,
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
  const startGame = () => {
    dispatch(setIsGameStarted(!isGameStarted));
    dispatch(setActiveCard());
    dispatch(setCardsForSelection());
  };
  return (
    <div className="savannah-container">
      <div>
        <h2>Savannah</h2>
        <button onClick={startGame}>Start</button>
      </div>
      {isGameStarted && <div>{activeCard.word}</div> }
      <div className="selection-container">
        {isGameStarted && cardsForSelection.map((word) => {
          return <div key={word.id}>{word.word}</div>;
        })}
      </div>
    </div>
  );
};
