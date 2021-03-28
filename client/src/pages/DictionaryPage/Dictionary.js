import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Card, Row, Col, Icon } from 'react-materialize';

import { getUserWord, getUserWordID } from '../../services/getAllWords';
import { DictionaryLoader } from '../../components/Loader';
import { Progress } from '../../components/Progress';
import { DictionaryCard } from './DictionaryCard';
import { LANGUAGE_CONFIG, WORDS_CONFIG } from '../../shared/words-config';

import './Dictionary.css';

export const Dictionary = () => {
  const language = useSelector((store) => store.settingsStore.activeLanguage);
  const { userData } = useSelector((store) => store.authStore);

  const [isLoadingWords, setLoadingWords] = useState(true);
  const [userWords, setUserWords] = useState([]);
  const [userWordId, setUserWordId] = useState([]);

  useEffect(() => {
    const { token, userId } = userData;
    const words = async () => {
      await getUserWord({
        token: token,
        userId: userId,
      }).then((res) => {
        setUserWords(res);
        setLoadingWords(false);
      });
    };
    words();
  }, []);
  const title =
    language === LANGUAGE_CONFIG.native
      ? WORDS_CONFIG.DICTIONARY_CARD_TITLE.native
      : WORDS_CONFIG.DICTIONARY_CARD_TITLE.foreign;

  const handleClick = async (index) => {
    const level = index === 0 ? 'studied' : index === 1 ? 'learned' : 'deleted';
    const arr = userWords.filter((item) => item.difficulty === level);
    const { wordId } = arr[0];
    const { token, userId } = userData;

    console.log(level, wordId, token, userId);
    console.log(arr);
    await getUserWordID({
      token: token,
      userId: userId,
      wordId: wordId,
    }).then((res) => {
      setUserWordId(res);
    });
  };
  return (
    <div className="dictionary valign-wrapper">
      <Row>
        {isLoadingWords && <DictionaryLoader />}
        <Col s={12}>{!isLoadingWords && <Progress />}</Col>

        <Col s={12}>
          <Row className="dictionary__cards">
            {title.map((item, index) => {
              return (
                <DictionaryCard
                  title={item}
                  language={language}
                  index={index}
                  handleClick={handleClick}
                  key={index}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
