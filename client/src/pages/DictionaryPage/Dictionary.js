import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Row, Col } from 'react-materialize';

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

  const [userLearningWords, setUserLearningWords] = useState([]);
  const [userHardWords, setUserHardWords] = useState([]);
  const [userDelWords, setUserDelWords] = useState([]);

  useEffect(() => {
    const { token, userId } = userData;
    const words = async () => {
      await getUserWord({
        token: token,
        userId: userId,
      }).then((res) => {
        const arrLearnWords = res
          .filter((item) => item.difficulty === 'learned')
          .map((item) => item.wordId);
        const arrHardWords = res
          .filter((item) => item.difficulty === 'hard')
          .map((item) => item.wordId);
        const arrDelWords = res
          .filter((item) => item.difficulty === 'deleted')
          .map((item) => item.wordId);
        setUserLearningWords(arrLearnWords);
        setUserHardWords(arrHardWords);
        setUserDelWords(arrDelWords);
        setLoadingWords(false);
      });
    };
    words();
  }, []);
  const cardTitle =
    language === LANGUAGE_CONFIG.native
      ? WORDS_CONFIG.DICTIONARY_CARD_TITLE.native
      : WORDS_CONFIG.DICTIONARY_CARD_TITLE.foreign;
  const title =
    language === LANGUAGE_CONFIG.native
      ? WORDS_CONFIG.DICTIONARY_TITLE.native
      : WORDS_CONFIG.DICTIONARY_TITLE.foreign;

  const handleClick = (index) => {
    const level = index === 0 ? 'learned' : index === 1 ? 'hard' : 'deleted';

    console.log(level);
  };
  const totalWords =
    userLearningWords.length + userHardWords.length + userDelWords.length;
  return (
    <div className="dictionary valign-wrapper">
      <Row>
        {isLoadingWords && <DictionaryLoader />}
        <Col s={12}>
          {!isLoadingWords && (
            <Progress title={title} language={language} total={totalWords} />
          )}
        </Col>

        <Col s={12}>
          <Row className="dictionary__cards">
            {cardTitle.map((item, index) => {
              return (
                <DictionaryCard
                  title={item}
                  language={language}
                  index={index}
                  handleClick={handleClick}
                  key={index}
                  number={[
                    userLearningWords.length,
                    userHardWords.length,
                    userDelWords.length,
                  ]}
                  isLoader={isLoadingWords}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
