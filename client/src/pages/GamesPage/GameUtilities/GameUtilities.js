import moment from "moment";
import { rsLangApi } from "../../../services/rs-lang-api";
export const sendStatistic = (isAuthenticated, userId, token, wholeLearnedWords, optionalStatisticObject, numberOfLearnedWords, numberOfIncorrectAnswers) => {
  if (isAuthenticated) {
    let now = moment().format("DD-MM-YYYY");
    const newWholeLearnedWords = wholeLearnedWords + numberOfLearnedWords
    const optionalObject = { ...optionalStatisticObject };
    if (!optionalObject[now]) {
      optionalObject[now] = {
        date: now,
        learnedWords: newWholeLearnedWords,
        correctAnswers: numberOfLearnedWords,
        incorrectAnswers: numberOfIncorrectAnswers,
      };
    } else
      optionalObject[now] = {
        date: now,
        learnedWords: newWholeLearnedWords,
        correctAnswers:
          optionalObject[now].correctAnswers + numberOfLearnedWords,
        incorrectAnswers:
          optionalObject[now].incorrectAnswers + numberOfIncorrectAnswers,
      };
    rsLangApi.sendStatistic(
      userId,
      token,
      newWholeLearnedWords,
      optionalObject
    );
  }
};

export const playSound = (answer) => {
  const audio = new Audio();
  audio.src = answer;
  audio.play();
};