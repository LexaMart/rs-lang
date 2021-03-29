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
  const [userWordsId, setUserWordsId] = useState([]);
  const [userWords, setUserWords] = useState([]);

  useEffect(() => {
    const { token, userId } = userData;
    const words = async () => {
      await getUserWord({
        token: token,
        userId: userId,
      }).then((res) => {
        setUserWordsId(res);
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
    const level = index === 0 ? 'learned' : index === 1 ? 'hard' : 'deleted';

    const wordIdArr = userWordsId
      .filter((item) => item.difficulty === level)
      .map((item) => item.wordId);
    const { token } = userData;
    let wordArr = [];
    console.log(wordIdArr);

    for (const item of wordIdArr) {
      const word = await getUserWordID({
        token: token,
        wordId: item,
      });
      wordArr.push(word);
    }
    setUserWords(wordArr);
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
