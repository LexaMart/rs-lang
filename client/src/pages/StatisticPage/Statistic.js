import React, { useState, useEffect, useCallback } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { getStatistic } from "../../redux/statistics-reducer";
import { setCurrentPage } from "../../redux/settings-reducer";
import {
  CURRENT_PAGE_NAME,
  LANGUAGE_CONFIG,
  WORDS_CONFIG,
} from "../../shared/words-config";
import Lion from "../../assets/images/lion.svg";
import Sprint from "../../assets/images/sprint.svg";
import Joystick from "../../assets/images/joystick.svg";
import Audio from "../../assets/images/audio.svg";
import "materialize-css";
import "./statistic.scss";

import Popup from "../../components/Popup";

const ERROR_DIVINE_COEFFICIENT = 0;

export const Statistic = () => {
  const activeLanguage = useSelector(
    (store) => store.settingsStore.activeLanguage
  );
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const wholeLearnedWords = useSelector(
    (store) => store.statisticsStore.learnedWords
  );
  const wholeIncorrectWords = useSelector(
    (store) => store.statisticsStore.incorrectAnswers
  );
  const savannahMaxSeries = useSelector(
    (store) => store.statisticsStore.savannahMaxSeries
  );
  const savannahLearnedWords = useSelector(
    (store) => store.statisticsStore.savannahLearnedWords
  );
  const savannahIncorrectAnswers = useSelector(
    (store) => store.statisticsStore.savannahIncorrectAnswers
  );
  const audioCallMaxSeries = useSelector(
    (store) => store.statisticsStore.audioCallMaxSeries
  );
  const audioCallLearnedWords = useSelector(
    (store) => store.statisticsStore.audioCallLearnedWords
  );
  const audioCallIncorrectAnswers = useSelector(
    (store) => store.statisticsStore.audioCallIncorrectAnswers
  );
  const sprintMaxSeries = useSelector(
    (store) => store.statisticsStore.sprintMaxSeries
  );
  const sprintLearnedWords = useSelector(
    (store) => store.statisticsStore.sprintLearnedWords
  );
  const sprintIncorrectAnswers = useSelector(
    (store) => store.statisticsStore.sprintIncorrectAnswers
  );
  const myGameMaxSeries = useSelector(
    (store) => store.statisticsStore.myGameMaxSeries
  );
  const myGameLearnedWords = useSelector(
    (store) => store.statisticsStore.myGameLearnedWords
  );
  const myGameIncorrectAnswers = useSelector(
    (store) => store.statisticsStore.myGameIncorrectAnswers
  );
  const statisticsOptionalData = useSelector(
    (store) => store.statisticsStore.statisticsData.optional
  );
  const [rechartsData, setRechartsData] = useState();
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(
    useCallback(async () => {
      dispatch(setCurrentPage(CURRENT_PAGE_NAME.STATISTIC));
      if (isAuthenticated) {
        dispatch(getStatistic(userId, token));
        if (statisticsOptionalData) {
          const data = Object.values(statisticsOptionalData);
          setRechartsData(data);
        }
      }
    }, [dispatch, isAuthenticated, statisticsOptionalData, token, userId]),
    [isAuthenticated]
  );
  useEffect(() => {
    if (
      !wholeLearnedWords &&
      !savannahLearnedWords &&
      !audioCallLearnedWords &&
      !sprintLearnedWords &&
      !myGameLearnedWords
    ) {
      setModalActive(true);
    }
  }, [
    wholeLearnedWords,
    savannahLearnedWords,
    audioCallLearnedWords,
    sprintLearnedWords,
    myGameLearnedWords,
  ]);
  return (
    <>
      <div className="stat_page_container white-text">
        <h1>
          {activeLanguage === LANGUAGE_CONFIG.native
            ? WORDS_CONFIG.STATISTICS_PAGE.native
            : WORDS_CONFIG.STATISTICS_PAGE.foreign}
        </h1>
        <div className="average_stat">
          <div className="capt">
            {" "}
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.AVERAGE_STATISTIC.native
              : WORDS_CONFIG.AVERAGE_STATISTIC.foreign}
          </div>
          <div>
            {" "}
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.WHOLE_ANSWERS.native
              : WORDS_CONFIG.WHOLE_ANSWERS.foreign}{" "}
            {wholeLearnedWords}
          </div>
          <div>
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.WIN_PERCENTS.native
              : WORDS_CONFIG.WIN_PERCENTS.foreign}{" "}
            {(
              (wholeLearnedWords / (wholeLearnedWords + wholeIncorrectWords) ||
                ERROR_DIVINE_COEFFICIENT) * 100
            ).toFixed(2) || 0}
            %
          </div>
        </div>
        <div className="capt">
          {activeLanguage === LANGUAGE_CONFIG.native
            ? WORDS_CONFIG.SPECIAL_STATISTIC.native
            : WORDS_CONFIG.SPECIAL_STATISTIC.foreign}
        </div>
        <div className="stat_container">
          <div className="stat_block savannah_stat card">
            <img src={Lion} alt="lion" className="game_stat_img" />
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.MAX_SERIES.native
                : WORDS_CONFIG.MAX_SERIES.foreign}{" "}
              {savannahMaxSeries}
            </p>
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.CORRECT_ANSWERS.native
                : WORDS_CONFIG.CORRECT_ANSWERS.foreign}{" "}
              {savannahLearnedWords}
            </p>
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.WIN_PERCENTS.native
                : WORDS_CONFIG.WIN_PERCENTS.foreign}{" "}
              {(
                (savannahLearnedWords /
                  (savannahLearnedWords + savannahIncorrectAnswers) ||
                  ERROR_DIVINE_COEFFICIENT) * 100
              ).toFixed(2) || 0}{" "}
              %
            </p>
          </div>
          <div className="stat_block audiocall_stat card">
            <img src={Audio} alt="audio" className="game_stat_img" />
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.MAX_SERIES.native
                : WORDS_CONFIG.MAX_SERIES.foreign}{" "}
              {audioCallMaxSeries}
            </p>
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.CORRECT_ANSWERS.native
                : WORDS_CONFIG.CORRECT_ANSWERS.foreign}{" "}
              {audioCallLearnedWords}
            </p>
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.WIN_PERCENTS.native
                : WORDS_CONFIG.WIN_PERCENTS.foreign}{" "}
              {(
                (audioCallLearnedWords /
                  (audioCallLearnedWords + audioCallIncorrectAnswers) ||
                  ERROR_DIVINE_COEFFICIENT) * 100
              ).toFixed(2) || 0}{" "}
              %
            </p>
          </div>
          <div className="stat_block sprint_stat card">
            <img src={Sprint} alt="sprint" className="game_stat_img" />
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.MAX_SERIES.native
                : WORDS_CONFIG.MAX_SERIES.foreign}{" "}
              {sprintMaxSeries}
            </p>
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.CORRECT_ANSWERS.native
                : WORDS_CONFIG.CORRECT_ANSWERS.foreign}{" "}
              {sprintLearnedWords}
            </p>
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.WIN_PERCENTS.native
                : WORDS_CONFIG.WIN_PERCENTS.foreign}{" "}
              {(
                (sprintLearnedWords /
                  (sprintLearnedWords + sprintIncorrectAnswers) ||
                  ERROR_DIVINE_COEFFICIENT) * 100
              ).toFixed(2) || 0}{" "}
              %
            </p>
          </div>
          <div className="stat_block mygame_stat card">
            <img src={Joystick} alt="joystick" className="game_stat_img" />
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.MAX_SERIES.native
                : WORDS_CONFIG.MAX_SERIES.foreign}{" "}
              {myGameMaxSeries}
            </p>
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.CORRECT_ANSWERS.native
                : WORDS_CONFIG.CORRECT_ANSWERS.foreign}{" "}
              {myGameLearnedWords}
            </p>
            <p>
              {activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.WIN_PERCENTS.native
                : WORDS_CONFIG.WIN_PERCENTS.foreign}{" "}
              {(
                (myGameLearnedWords /
                  (myGameLearnedWords + myGameIncorrectAnswers) ||
                  ERROR_DIVINE_COEFFICIENT) * 100
              ).toFixed(2) || 0}{" "}
              %
            </p>
          </div>
        </div>
        <div className="capt">
          {" "}
          {activeLanguage === LANGUAGE_CONFIG.native
            ? WORDS_CONFIG.CHARTS.native
            : WORDS_CONFIG.CHARTS.foreign}
        </div>
        <>
          <ResponsiveContainer width="80%" height={250}>
            <AreaChart
              data={rechartsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="correctAnswers"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="incorrectAnswers"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p>
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.FIRST_STATISTIC_CHART_NAME.native
              : WORDS_CONFIG.FIRST_STATISTIC_CHART_NAME.foreign}
          </p>
        </>
        <>
          <ResponsiveContainer width="80%" height={250}>
            <AreaChart
              width={730}
              height={250}
              data={rechartsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="learnedWords"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p>
            {activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.SECOND_STATISTIC_CHART_NAME.native
              : WORDS_CONFIG.SECOND_STATISTIC_CHART_NAME.foreign}
          </p>
        </>
      </div>
    </>
  );
};
