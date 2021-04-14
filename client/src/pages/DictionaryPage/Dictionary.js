import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-materialize';
import { getWords } from '../../services/getAllWords';
import { DictionaryLoader } from '../../components/Loader';
import { Progress } from './Components/Progress';
import { DictionaryCard } from './Components/DictionaryCard';
import { DictionaryList } from './Components/DictionaryList';
import { CURRENT_PAGE_NAME, LANGUAGE_CONFIG, WORDS_CATEGORIES, WORDS_CONFIG } from '../../shared/words-config';
import { setCurrentPage } from '../../redux/settings-reducer';
import {
  setUserLearningWords,
  setUserHardWords,
  setUserDeletedWords,
} from '../../redux/auth-reducer';
import './Dictionary.scss';

export const Dictionary = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.settingsStore.activeLanguage);
  const { userData } = useSelector((store) => store.authStore);

  const [isLoadingWords, setLoadingWords] = useState(true);
  const [isPageRender, setPageRender] = useState(false);
  const [nameCards, setNameCards] = useState('');

  const userLearningWords = useSelector(
    (store) => store.authStore.userLearningWords
  );
  const userHardWords = useSelector((store) => store.authStore.userHardWords);
  const userDeletedWords = useSelector(
    (store) => store.authStore.userDeletedWords
  );
  let { path } = useRouteMatch();

  useEffect(() => {
    const { token, userId } = userData;
    wordsNew(token, userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    dispatch(setCurrentPage(CURRENT_PAGE_NAME.DICTIONARY));
    if (isPageRender === true) {
      dispatch(setCurrentPage(CURRENT_PAGE_NAME.Dictionary));
      const { token, userId } = userData;
      wordsNew(token, userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageRender]);

  const wordsNew = async (token, userId) => {
    const words = {
      learn: true,
      hard: true,
      deleted: true,
    };
    await getWords(token, userId, words).then((res) => {
      dispatch(setUserLearningWords(res.learn));
      dispatch(setUserHardWords(res.hard));
      dispatch(setUserDeletedWords(res.deleted));
      setLoadingWords(false);
    });
  };

  const cardTitle =
    language === LANGUAGE_CONFIG.native
      ? WORDS_CONFIG.DICTIONARY_CARD_TITLE.native
      : WORDS_CONFIG.DICTIONARY_CARD_TITLE.foreign;
  const title =
    language === LANGUAGE_CONFIG.native
      ? WORDS_CONFIG.DICTIONARY_TITLE.native
      : WORDS_CONFIG.DICTIONARY_TITLE.foreign;
  const handleClick = (index) => {
    const name = index === 0 ? 'learning' : index === 1 ? WORDS_CATEGORIES.hard : WORDS_CATEGORIES.deleted;
    setNameCards(name);
  };
  const totalWords =
    userLearningWords.length + userHardWords.length + userDeletedWords.length ||
    0;

  return (
    <div className="dictionary">
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
                token={userData.token}
                language={language}
                nameList={nameCards}
                pageRender={setPageRender}
                isPageRender={isPageRender}
              />
            </Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
};
