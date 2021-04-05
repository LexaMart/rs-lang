import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col } from "react-materialize";

import { getUserWord } from "../../services/getAllWords";
import { DictionaryLoader } from "../../components/Loader";
import { Progress } from "./Components/Progress";
import { DictionaryCard } from "./Components/DictionaryCard";
import { DictionaryList } from "./Components/DictionaryList";
import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";

import "./Dictionary.scss";
import { setCurrentPage } from "../../redux/settings-reducer";
import {
  setUserLearningWords,
  setUserHardWords,
  setUserDeletedWords,
} from "../../redux/auth-reducer";

export const Dictionary = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.settingsStore.activeLanguage);
  const { userData } = useSelector((store) => store.authStore);

  const [isLoadingWords, setLoadingWords] = useState(true);
  const [nameCards, setNameCards] = useState("");

  // const [userLearningWords, setUserLearningWords] = useState([]);
  // const [userHardWords, setUserHardWords] = useState([]);
  // const [userDelWords, setUserDelWords] = useState([]);
  const userLearningWords = useSelector(
    (store) => store.authStore.userLearningWords
  );
  const userHardWords = useSelector((store) => store.authStore.userHardWords);
  const userDeletedWords = useSelector(
    (store) => store.authStore.userDeletedWords
  );
  const [userWordsData, setUserWordsData] = useState([]);

  let { path } = useRouteMatch();

  useEffect(() => {
    dispatch(setCurrentPage("dictionary"));
    const { token, userId } = userData;
    const words = async () => {
      await getUserWord({
        token: token,
        userId: userId,
      }).then((res) => {
        const arrLearnWords = res
          .filter((item) => item.difficulty === "learned")
          .map((item) => item.wordId);
        const arrHardWords = res
          .filter((item) => item.difficulty === "hard")
          .map((item) => item.wordId);
        const arrDelWords = res
          .filter((item) => item.difficulty === "deleted")
          .map((item) => item.wordId);
        // setUserLearningWords(arrLearnWords);
        // setUserHardWords(arrHardWords);
        // setUserDelWords(arrDelWords);
        dispatch(setUserLearningWords(arrLearnWords));
        dispatch(setUserHardWords(arrHardWords));
        dispatch(setUserDeletedWords(arrDelWords));
        setLoadingWords(false);
      });
    };
    words();
  }, [userData]);
  const cardTitle =
    language === LANGUAGE_CONFIG.native
      ? WORDS_CONFIG.DICTIONARY_CARD_TITLE.native
      : WORDS_CONFIG.DICTIONARY_CARD_TITLE.foreign;
  const title =
    language === LANGUAGE_CONFIG.native
      ? WORDS_CONFIG.DICTIONARY_TITLE.native
      : WORDS_CONFIG.DICTIONARY_TITLE.foreign;

  const handleClick = (index) => {
    const data =
      index === 0
        ? [...userLearningWords, ...userHardWords]
        : index === 1
        ? userHardWords
        : userDeletedWords;
    const name = index === 0 ? "learning" : index === 1 ? "hard" : "deleted";
    setUserWordsData([data, userHardWords]);
    setNameCards(name);
  };
  const totalWords =
    userLearningWords.length + userHardWords.length + userDeletedWords.length;

  return (
    <div className="dictionary valign-wrapper">
      <Row>
        <Col s={12}>
          <div className="dictionary__progress">
            {isLoadingWords && <DictionaryLoader color="white" />}
            {!isLoadingWords && (
              <Progress title={title} language={language} total={totalWords} />
            )}
          </div>
        </Col>
        <Col s={12}>
          <Switch>
            <Route exact path={path}>
              <div className="dictionary__cards">
                {cardTitle.map((item, index) => {
                  return (
                    <DictionaryCard
                      title={item}
                      language={language}
                      index={index}
                      handleClick={handleClick}
                      key={index}
                      number={[
                        userLearningWords.length + userHardWords.length,
                        userHardWords.length,
                        userDeletedWords.length,
                      ]}
                      isLoader={isLoadingWords}
                    />
                  );
                })}
              </div>
            </Route>
            <Route path={`${path}/:list`}>
              <DictionaryList
                data={userWordsData}
                token={userData.token}
                language={language}
                nameList={nameCards}
              />
            </Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
};
