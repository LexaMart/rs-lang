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
import {
  getStatistic
} from "../../redux/statistics-reducer";

export const Statistic = () => {
  const token = useSelector((store) => store.authStore.userData.token);
  const userId = useSelector((store) => store.authStore.userData.userId);
  const isAuthenticated = useSelector((store) => store.authStore.isAuthorized);
  const wholeLearnedWords = useSelector((store) => store.statisticsStore.learnedWords);
  const { request } = useHttp();
  const [rechartsData, setRechartsData] = useState();
  const dispatch = useDispatch();


  useEffect(
    useCallback(async () => {
      if (isAuthenticated) {
        dispatch(getStatistic(userId, token))
        const statistics = await request(
          `${urls.API}/users/${userId}/statistics`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        );
        const data = Object.values(statistics.optional);

        setRechartsData(data);
      }
    }, [isAuthenticated, request, token, userId]),
    [isAuthenticated]
  );

  return (
    <div>
      <h1> Statistic Page</h1>
      <>
      <p>Whole learned words: {wholeLearnedWords}</p>
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
