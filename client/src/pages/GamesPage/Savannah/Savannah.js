import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Savannah.scss";
import { RS_LANG_API } from "../../../services/rs-lang-api";

import { GAME_DEFAULT_VALUES } from "../../../shared/games-config";
import { wordsMockData } from "../../../shared/wordsMockData";
import { useHttp } from "../../../hooks/http.hook";
import { useSelector } from "react-redux";
import urls from "../../../assets/constants/ursl";
import { Select } from "react-materialize";

const KEYBOARD_KEYS = {
  START_KEYBOARD_USE: "NumpadDivide",
  STOP_KEYBOARD_USE: "NumpadMultiply",
  RESTART_GAME: "NumpadEnter",
  FIRST_NUMBER: "Numpad1",
  SECOND_NUMBER: "Numpad2",
  THIRD_NUMBER: "Numpad3",
  FORTH_NUMBER: "Numpad4",
  // LEFT_CLICK: 'Numpad5',
  // RIGHT_CLICK: 'Numpad0',
};

const useKey = (key, cb) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    const handle = (event) => {
      if (event.code === key) {
        callbackRef.current(event);
      }
    };
    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
};

export const MAX_NUMBER = {
  LEVEL: 6,
  PAGE: 30,
};

export const Savannah = () => {
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const { request } = useHttp();
  const [isGameStarted, setIsGameStarted] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameWon, setIsGameWon] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameLost, setIsGameLost] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [livesArray, setLivesArray] = useState(GAME_DEFAULT_VALUES.LIVES_ARRAY);
  const [wordsArray, setWordsArray] = useState(wordsMockData);
  const [remainWordsArray, setRemainWordsArray] = useState(wordsMockData);
  const [activeCard, setActiveCard] = useState(null);
  const levelsArray = [];
  const pagesArray = [];

  const [cardsForSelection, setCardsForSelection] = useState(null);

  const [levelInputValue, setLevelInputText] = useState(1);
  const [pageInputValue, setPageInputText] = useState(1);

  useEffect(() => {
    if (activeCard) {
      playActiveCardAudio();
    }
  }, [activeCard]);

  for (let i = 0; i < MAX_NUMBER.LEVEL; i++) {
    levelsArray.push(i + 1);
  }
  for (let i = 0; i < MAX_NUMBER.PAGE; i++) {
    pagesArray.push(i + 1);
  }

  const startGame = () => {
    setDefaultGameSettings();
    setIsGameStarted(GAME_DEFAULT_VALUES.TRUE);
    setRandomActiveCardAndCardsForSelection();
  };
  useEffect(useCallback(async () => {
    if (isGameStarted) {
      const cards = await request(`${urls.API}/words?group=${levelInputValue}}&page=${pageInputValue}`, "GET")
      setWordsArray(cards);
      setRemainWordsArray(cards);
    }
  }, [isGameStarted, levelInputValue, pageInputValue, request]), [isGameStarted])

  const setDefaultGameSettings = async () => {
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

  const handleCardClick = async (event, word) => {
    console.log(word.wordTranslate);
    if (word.id === activeCard.id) {
      guessTheWord();
      if (isAuthenticated) {
        await request(
          `${urls.API}/users/${userId}/words/${word.id}`,
          "POST",
          {
            difficulty: "learned",
          },
          {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        );
      } else notGuessTheWord();
    }
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

  // useKey(KEYBOARD_KEYS.RESTART_GAME, handleRestartGame);
  // useKey(KEYBOARD_KEYS.START_KEYBOARD_USE, handleStartKeyboardUse);

  // useKey(KEYBOARD_KEYS.STOP_KEYBOARD_USE, handleStopKeyboardUse);
  // useKey(KEYBOARD_KEYS.MOVE_UP, handleMoveUp);
  if (isGameStarted) {
  }

  useKey(
    KEYBOARD_KEYS.FIRST_NUMBER,
    () =>
      isGameStarted &&
      cardsForSelection &&
      handleCardClick(null, cardsForSelection[0])
  );
  useKey(
    KEYBOARD_KEYS.SECOND_NUMBER,
    () =>
      isGameStarted &&
      cardsForSelection &&
      handleCardClick(null, cardsForSelection[1])
  );
  useKey(
    KEYBOARD_KEYS.THIRD_NUMBER,
    () =>
      isGameStarted &&
      cardsForSelection &&
      handleCardClick(null, cardsForSelection[2])
  );
  useKey(
    KEYBOARD_KEYS.FORTH_NUMBER,
    () =>
      isGameStarted &&
      cardsForSelection &&
      handleCardClick(null, cardsForSelection[3])
  );

  return (
    <div className="savannah-container">
      <h2>Savannah</h2>
      {isGameWon && <div className="win-screen">WIN</div>}
      {isGameLost && <div className="lost-screen">LOST</div>}
      {!isGameStarted && (
        <>
        <Select
          id="select-level"
          multiple={false}
          onChange={setLevelInputText}
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            },
          }}
          value={levelInputValue}
        >
          {levelsArray.map((el) => {
            return <option value={el}>{el}</option>;
          })}
        </Select>
         <Select
         id="select-level"
         multiple={false}
         onChange={setPageInputText}
         options={{
           classes: "",
           dropdownOptions: {
             alignment: "left",
             autoTrigger: true,
             closeOnClick: true,
             constrainWidth: true,
             coverTrigger: true,
             hover: false,
             inDuration: 150,
             onCloseEnd: null,
             onCloseStart: null,
             onOpenEnd: null,
             onOpenStart: null,
             outDuration: 250,
           },
         }}
         value={pageInputValue}
       >
         {pagesArray.map((el) => {
           return <option value={el}>{el}</option>;
         })}
       </Select>
       </>
      )}
      {!isGameStarted && <button onClick={startGame}>Start</button>}
      {isGameStarted && (
        <div className="lives-container">
          {livesArray.map((live) => {
            return <div>X</div>;
          })}
        </div>
      )}
      {isGameStarted && (
        <div className="savannah-card_active activeCardFall">
          {activeCard.word}
        </div>
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
