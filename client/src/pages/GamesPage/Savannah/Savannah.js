import React, { useState, useEffect, useCallback } from "react";
import "./Savannah.scss";
import "materialize-css";
import { RS_LANG_API } from "../../../services/rs-lang-api";
import { GAME_DEFAULT_VALUES } from "../../../shared/games-config";
import { useHttp } from "../../../hooks/http.hook";
import { useKey } from "../../../hooks/keyboardEvents.hook";
import { useSelector, useDispatch } from "react-redux";
import urls from "../../../assets/constants/ursl";
import { Select } from "react-materialize";
import {
  setSavannahLearnedWords,
  setSavannahIncorrectAnswers,
  getStatistic,
} from "../../../redux/statistics-reducer";
import { rsLangApi } from "../../../services/rs-lang-api";
import { sendStatistic } from "../GameUtilities/GameUtilities";
import correctAudio from "../../../assets/sounds/savannah_correct.mp3";
import errorAudio from "../../../assets/sounds/savannah_error.mp3";
import savannahGunImg from "../../../assets/images/savannah_gun.png";
import savannahGrass from "../../../assets/images/savannah-grass.png";
import savannahLion from "../../../assets/images/savannah_lion.png";
import savananhGunShot from "../../../assets/images/savannah_gun_shot.png";
import {
  CURRENT_PAGE_NAME,
  WORDS_CATEGORIES,
  LANGUAGE_CONFIG,
  WORDS_CONFIG,
} from "../../../shared/words-config";
import { MainPagePreloader } from "../../../components/Loader";
import { DEFAULT_VALUES } from "../../../redux/auth-reducer";

const KEYBOARD_KEYS = {
  START_KEYBOARD_USE: "NumpadDivide",
  STOP_KEYBOARD_USE: "NumpadMultiply",
  RESTART_GAME: "NumpadEnter",
  FIRST_NUMBER: "Numpad1",
  SECOND_NUMBER: "Numpad2",
  THIRD_NUMBER: "Numpad3",
  FORTH_NUMBER: "Numpad4",
};

export const MAX_NUMBER = {
  LEVEL: 6,
  PAGE: 30,
};

export const Savannah = () => {
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const optionalStatisticObject = useSelector(
    (store) => store.statisticsStore.statisticsData.optional
  );
  const wholeLearnedWords = useSelector(
    (store) => store.statisticsStore.learnedWords
  );
  const currentPage = useSelector((store) => store.settingsStore.currentPage);
  const currentWordsPage = useSelector(
    (store) => store.settingsStore.currentWordsPage
  );
  const currentWordsGroup = useSelector(
    (store) => store.settingsStore.currentWordsGroup
  );
  const activeLanguage = useSelector(
    (store) => store.settingsStore.activeLanguage
  );
  const { request } = useHttp();
  const [isGameStarted, setIsGameStarted] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameWon, setIsGameWon] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isGameLost, setIsGameLost] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [livesArray, setLivesArray] = useState(GAME_DEFAULT_VALUES.LIVES_ARRAY);
  const [wordsArray, setWordsArray] = useState([]);
  const [remainWordsArray, setRemainWordsArray] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [numberOfLearnedWords, setNumberOfLearnedWords] = useState(0);
  const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(GAME_DEFAULT_VALUES.FALSE);
  const levelsArray = [];
  const pagesArray = [];

  const [cardsForSelection, setCardsForSelection] = useState(null);
  const [isWordFalling, setIsWordFalling] = useState(GAME_DEFAULT_VALUES.FALSE);
  const [isActiveCardSpacing, setIsActiveCardSpacing] = useState(
    GAME_DEFAULT_VALUES.FALSE
  );
  const [isGunShooting, setIsGunShooting] = useState(GAME_DEFAULT_VALUES.FALSE);

  const [levelInputValue, setLevelInputText] = useState(1);
  const [pageInputValue, setPageInputText] = useState(1);

  const dispatch = useDispatch();

  for (let i = 0; i < MAX_NUMBER.LEVEL; i++) {
    levelsArray.push(i + 1);
  }
  for (let i = 0; i < MAX_NUMBER.PAGE; i++) {
    pagesArray.push(i + 1);
  }

  const startGame = () => {
    setDefaultGameSettings();
    setIsLoading(GAME_DEFAULT_VALUES.TRUE);

    setTimeout(() => {
      setIsGameStarted(GAME_DEFAULT_VALUES.TRUE);
    }, 0);
    if (isAuthenticated) {
      dispatch(getStatistic(userId, token));
    }
  };

  useEffect(
    useCallback(async () => {
      if (isGameStarted) {
        setIsLoading(GAME_DEFAULT_VALUES.TRUE)
        const cards = await request(
          `${urls.API}/words?group=${
            currentPage !== CURRENT_PAGE_NAME.MAIN
              ? levelInputValue - 1
              : currentWordsPage
          }&page=${
            currentPage !== CURRENT_PAGE_NAME.MAIN
              ? pageInputValue - 1
              : currentWordsGroup
          }`,
          "GET"
        );
        setIsLoading(DEFAULT_VALUES.FALSE)
        setWordsArray(cards);
        setRemainWordsArray(cards);
        setRandomActiveCardAndCardsForSelection(cards, cards);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      currentPage,
      currentWordsGroup,
      currentWordsPage,
      isGameStarted,
      levelInputValue,
      pageInputValue,
      request,
    ]),
    [isGameStarted]
  );

  const setDefaultGameSettings = async () => {
    setNumberOfLearnedWords(0);
    setNumberOfIncorrectAnswers(0);
    setIsActiveCardSpacing(GAME_DEFAULT_VALUES.FALSE);
    setIsWordFalling(GAME_DEFAULT_VALUES.FALSE);
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

  const playCorrectAudio = () => {
    const audio = new Audio();
    audio.src = correctAudio;
    audio.play();
  };
  const playErrorAudio = () => {
    const audio = new Audio();
    audio.src = errorAudio;
    audio.play();
  };

  const getRandomCardsForSelect = (wordsArray, activeCard) => {
    const arrayOfCardsForSelect = [...wordsArray].filter(
      (card) => card.id !== activeCard.id
    );
    const result = [];
    for (let i = 0; i < GAME_DEFAULT_VALUES.SAVANNAH_CARDS_NUMBER; i++) {
      let index = getRandomValue(arrayOfCardsForSelect.length - 1);
      let curCard = arrayOfCardsForSelect[index];
      arrayOfCardsForSelect.splice(index, 1);
      result.push(curCard);
    }
    result.splice(
      Math.floor(Math.random() * Math.floor(GAME_DEFAULT_VALUES.SAVANNAH_CARDS_NUMBER)),
      0,
      activeCard
    );
    return result;
  };

  const handleCardClick = async (event, word) => {
    setIsWordFalling(GAME_DEFAULT_VALUES.FALSE);
    if (word.id === activeCard.id) {
      guessTheWord();
      setNumberOfLearnedWords(numberOfLearnedWords + 1);
      if (isAuthenticated) {
        rsLangApi.postUserWord(
          token,
          userId,
          word.id,
          WORDS_CATEGORIES.learned
        );
      }
    } else notGuessTheWord();
  };

  const setRandomActiveCardAndCardsForSelection = (wordsArray, remainWordsArray) => {
    const activeCardIndex = getRandomValue(remainWordsArray.length - 1);
    const remainWordsArrayForSelection = [...remainWordsArray];
    setIsActiveCardSpacing(GAME_DEFAULT_VALUES.FALSE);
    setIsWordFalling(GAME_DEFAULT_VALUES.TRUE);
    setTimeout(() => {}, 0);
    setIsGunShooting(GAME_DEFAULT_VALUES.FALSE);
    setActiveCard(remainWordsArray[activeCardIndex]);
    setCardsForSelection(() =>
      getRandomCardsForSelect(wordsArray, remainWordsArray[activeCardIndex])
    );
    remainWordsArrayForSelection.splice(activeCardIndex, 1);
    setRemainWordsArray(remainWordsArrayForSelection);
  };

  const guessTheWord = () => {
    playCorrectAudio();
    setIsActiveCardSpacing(GAME_DEFAULT_VALUES.TRUE);
    setIsWordFalling(GAME_DEFAULT_VALUES.FALSE);
    setIsGunShooting(GAME_DEFAULT_VALUES.TRUE);
    if (remainWordsArray.length) {
      setTimeout(() => {
        setRandomActiveCardAndCardsForSelection(wordsArray, remainWordsArray);
      }, 300);
    } else {
      setIsGameWon(GAME_DEFAULT_VALUES.TRUE);
      setEndGameSettings();
    }
  };

  const notGuessTheWord = () => {
    setIsWordFalling(GAME_DEFAULT_VALUES.TRUE);
    setIsWordFalling(GAME_DEFAULT_VALUES.FALSE);
    playErrorAudio();
    const remainLivesArray = [...livesArray];
    remainLivesArray.splice(0, 1);
    setLivesArray(remainLivesArray);
    setNumberOfIncorrectAnswers(numberOfIncorrectAnswers + 1);
    if (remainLivesArray.length) {
      setTimeout(() => {
        setRandomActiveCardAndCardsForSelection(wordsArray, remainWordsArray);
      }, 300);
    } else {
      setIsGameLost(GAME_DEFAULT_VALUES.TRUE);
      setEndGameSettings();
    }
  };

  const setEndGameSettings = () => {
    setIsGameStarted(GAME_DEFAULT_VALUES.FALSE);
    setActiveCard(null);
    dispatch(setSavannahLearnedWords(numberOfLearnedWords));
    dispatch(setSavannahIncorrectAnswers(numberOfIncorrectAnswers));
    sendStatistic(
      isAuthenticated,
      userId,
      token,
      wholeLearnedWords,
      optionalStatisticObject,
      numberOfLearnedWords,
      numberOfIncorrectAnswers
    );
  };

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

  useEffect(() => {
    if (isGameStarted && activeCard) {
      playActiveCardAudio();
      const interval = setInterval(() => {
        // notGuessTheWord();
      }, 5000);
      if (!isWordFalling) {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCard]);

  if (isLoading) return <MainPagePreloader />;
  return (
    <>
      <div className="savannah-container">
        {!isGameStarted && !isGameLost && (
          <>
            <h2> {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.SAVANNAH.native
              : WORDS_CONFIG.SAVANNAH.foreign}</h2>
            <div className="rules">
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.SAVANNAH_RULES.native
              : WORDS_CONFIG.SAVANNAH_RULES.foreign}
            </div>
          </>
        )}
        {isGameWon && <div className="win-screen">WON</div>}
        {isGameLost && <div className="lost-screen">LOST</div>}
        {!isGameStarted && currentPage !== "main" && (
          <>
            <Select
              id="select-level"
              multiple={false}
              onChange={(event) => setLevelInputText(event.currentTarget.value)}
              value={levelInputValue}
            >
              {levelsArray.map((el) => {
                return <option value={el}>{el}</option>;
              })}
            </Select>
            <Select
              id="select-page"
              multiple={false}
              onChange={(event) => setPageInputText(event.currentTarget.value)}
              value={pageInputValue}
            >
              {pagesArray.map((el) => {
                return <option value={el}>{el}</option>;
              })}
            </Select>
          </>
        )}
        {!isGameStarted && (
          <button className="btn red" onClick={startGame}>
          {!isGameLost
            ? activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.START_BUTTON.native
              : WORDS_CONFIG.START_BUTTON.foreign
            : activeLanguage === LANGUAGE_CONFIG.native
            ? WORDS_CONFIG.RETRY_BUTTON.native
            : WORDS_CONFIG.RETRY_BUTTON.foreign}
        </button>
        )}
        {isGameStarted && (
          <>
            <div className="savannah-field">
              <div className="lives-container">
                {livesArray.map((el, index) => {
                  return (
                    <i key={`live${el}${index}`} className="material-icons">
                      favorite{" "}
                    </i>
                  );
                })}
              </div>
              <div className='animal_cage'>
              {activeCard && (
                <div
                  className={`savannah-card_active ${
                    isWordFalling ? "activeCardFall" : ""
                  } ${isActiveCardSpacing ? "activeCardSpacing" : ""}`}
                >
                  {activeCard.word}
                  <img src={savannahLion} alt="lion"></img>
                </div>
              )}
              </div>
              <div className="gun-container">
                <img
                  className="savannah_grass"
                  src={savannahGrass}
                  alt="savannah_crystal"
                />
                {isGunShooting && (
                  <img
                    className="savannah_gun_shot"
                    src={savananhGunShot}
                    alt="savannah_gun_shot"
                  />
                )}
                <img
                  className="savannah_gun"
                  src={savannahGunImg}
                  alt="savannah_gun"
                />
              </div>
            </div>
          </>
        )}

        {isGameStarted && cardsForSelection && (
          <div className="selection-container">
            {cardsForSelection.map((word, index) => {
              return (
                <div
                  key={word.id}
                  onClick={(event) => handleCardClick(event, word)}
                  className="savannah-card btn red"
                >
                  {index + 1}.{word.wordTranslate}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
