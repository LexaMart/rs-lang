import moment from "moment";
import { rsLangApi } from "../../../services/rs-lang-api";
export const sendStatistic = (isAuthenticated, userId, token, optionalStatisticObject, numberOfLearnedWords, numberOfIncorrectAnswers) => {
  if (isAuthenticated) {
    let now = moment().format("DD-MM-YYYY");
    const optionalObject = { ...optionalStatisticObject };
    //TODO move to redux??
    if (!optionalObject[now]) {
      optionalObject[now] = {
        date: now,
        learnedWords: numberOfLearnedWords,
        correctAnswers: numberOfLearnedWords,
        incorrectAnswers: numberOfIncorrectAnswers,
      };
    } else
      optionalObject[now] = {
        date: now,
        learnedWords: numberOfLearnedWords,
        correctAnswers:
          optionalObject[now].correctAnswers + numberOfLearnedWords,
        incorrectAnswers:
          optionalObject[now].incorrectAnswers + numberOfIncorrectAnswers,
      };
    rsLangApi.sendStatistic(
      userId,
      token,
      numberOfLearnedWords,
      optionalObject
    );
  }
};