import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import urls from "../../assets/constants/ursl";
import { getStatistic } from "../../redux/statistics-reducer";
import { setCurrentPage } from '../../redux/settings-reducer'

export const Statistic = () => {
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
  const dispatch = useDispatch();

  //TODO if you never played it brokes
  useEffect(
    useCallback(async () => {
      dispatch(setCurrentPage('statistic'))
      if (isAuthenticated) {
        dispatch(getStatistic(userId, token));
        const data = Object.values(statisticsOptionalData);
        setRechartsData(data);
      }
    }, [dispatch, isAuthenticated, statisticsOptionalData, token, userId]),
    [isAuthenticated]
  );

  return (
    <div>
      <h1> Statistic Page</h1>
      <>
        <p>Whole learned words: {wholeLearnedWords}</p>
        <p>
          Percents of wins:{" "}
          {(wholeLearnedWords / (wholeLearnedWords + wholeIncorrectWords)) *
            100 || 0}{" "}
          %
        </p>
        <p>savannahMaxSeries: {savannahMaxSeries}</p>
        <p>savannahLearnedWords: {savannahLearnedWords}</p>
        <p>
          Savannah Percents of wins:{" "}
          {(savannahLearnedWords /
            (savannahLearnedWords + savannahIncorrectAnswers)) *
            100 || 0}{" "}
          %
        </p>
        <p>audioCallMaxSeries: {audioCallMaxSeries}</p>
        <p>audioCallLearnedWords: {audioCallLearnedWords}</p>
        <p>
          AudioCall Percents of wins:{" "}
          {(audioCallLearnedWords /
            (audioCallLearnedWords + audioCallIncorrectAnswers)) *
            100 || 0}{" "}
          %
        </p>
        <p>sprintMaxSeries: {sprintMaxSeries}</p>
        <p>sprintLearnedWords: {sprintLearnedWords}</p>
        <p>
          sprint Percents of wins:{" "}
          {(sprintLearnedWords /
            (sprintLearnedWords + sprintIncorrectAnswers)) *
            100 || 0}{" "}
          %
        </p>
        <p>myGameMaxSeries: {myGameMaxSeries}</p>
        <p>myGameLearnedWords: {myGameLearnedWords}</p>
        <p>
          myGame Percents of wins:{" "}
          {(myGameLearnedWords /
            (myGameLearnedWords + myGameIncorrectAnswers)) *
            100 || 0}{" "}
          %
        </p>
        <p></p>
      </>
      <>
        <LineChart
          width={400}
          height={400}
          data={rechartsData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#fff" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="correctAnswers" stroke="#ccc" />
          <Line type="monotone" dataKey="incorrectAnswers" stroke="#fff" />
        </LineChart>
        <p>Correct answers each day</p>
      </>
      <>
        <LineChart
          width={400}
          height={400}
          data={rechartsData}
          // data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="learnedWords" stroke="#fff" />
        </LineChart>
        <p>Correct answers whole period</p>
      </>
    </div>
  );
};
