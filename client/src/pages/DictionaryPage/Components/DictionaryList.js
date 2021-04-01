import React, { useEffect, useState } from 'react';

import { useParams, useRouteMatch, Link } from 'react-router-dom';

import { getUserWordID } from '../../../services/getAllWords';
import urls from '../../../assets/constants/ursl';
import { DictionaryLoader } from '../../../components/Loader';
import { LANGUAGE_CONFIG, WORDS_CONFIG } from '../../../shared/words-config';

const DictionaryWordCard = ({ element, token, hard = false }) => {
  const [userWord, setUserWord] = useState('');
  const [isLoader, setLoader] = useState(true);

  useEffect(() => {
    const words = async () => {
      await getUserWordID({
        token: token,
        wordId: element,
      })
        .then((res) => {
          setUserWord(res);
          setLoader(false);
        })
        .catch((err) => {
          console.log('Something went wrong', err);
          setLoader(true);
        });
    };
    words();
  }, [element, token]);

  const addGroupClascsName = () => {
    const { group } = userWord;
    switch (group) {
      case 0:
        return 'group_1';
      case 1:
        return 'group_2';
      case 2:
        return 'group_3';
      case 3:
        return 'group_4';
      case 4:
        return 'group_5';
      case 5:
        return 'group_6';

      default:
        break;
    }
  };

  return (
    <div className={`word_card word_card__dictionary ${addGroupClascsName()}`}>
      {isLoader && <DictionaryLoader />}
      {!isLoader && (
        <React.Fragment>
          <img
            src={urls.API + '/' + userWord.image}
            alt="wordimage"
            className="word_card_bg"
          />
          <div className="word">{userWord.word}</div>
          {hard && (
            <i className="material-icons red-text word_card-hard">warning</i>
          )}
        </React.Fragment>
      )}
    </div>
  );
};
export const DictionaryList = ({
  data = [],
  token,
  language = 'en',
  nameList,
}) => {
  let { list } = useParams();
  let { path } = useRouteMatch();

  const dataLength = data[0].length;
  const wordsCurrentData = data[0] ? data[0].slice(0, 20) : [];

  const wordsHard = data[1];

  const [page, setPage] = useState(1);
  const [currentData, setCurrentData] = useState(wordsCurrentData);
  const [nextDataLength, setNextDataLength] = useState(dataLength);

  useEffect(() => {
    getCurrentDataWords();
  }, [page]);

  const style =
    nameList === 'learning'
      ? styles.btnGreen
      : nameList === 'hard'
      ? styles.btnBlue
      : styles.btnPink;

  const getTitle = () => {
    const arrName =
      language === LANGUAGE_CONFIG.native
        ? WORDS_CONFIG.DICTIONARY_CARD_TITLE.native
        : WORDS_CONFIG.DICTIONARY_CARD_TITLE.foreign;
    return list === 'learning'
      ? arrName[0]
      : list === 'hard'
      ? arrName[1]
      : arrName[2];
  };

  const pageBack = path.replace(/\/:list/g, '');

  const getItemHard = (el) => {
    return wordsHard.includes(el);
  };

  const getCurrentDataWords = () => {
    const startIndexDataWords = 20 * (page - 1);

    const arrayCurrentWords = data[0].slice(
      startIndexDataWords,
      startIndexDataWords + 20
    );
    setCurrentData(arrayCurrentWords);
  };

  const changePage = (incr) => {
    const nextPage = page + incr;

    const wordsNextDataLength =
      dataLength > 20 ? dataLength - 20 * (nextPage - 1) : 0;

    setNextDataLength(wordsNextDataLength);
    setPage(nextPage);
  };

  return (
    <div className="word_container__lists">
      <h3 className="word_container__title white-text">{getTitle()}</h3>
      <div className="word_container">
        {currentData &&
          currentData.map((el) => {
            const hard = getItemHard(el);
            return (
              <DictionaryWordCard
                element={el}
                token={token}
                key={el}
                hard={hard}
              />
            );
          })}
      </div>
      <div className="navigation">
        {page > 1 ? (
          <i
            className="arrow material-icons white-text btn"
            onClick={() => changePage(-1)}
          >
            keyboard_arrow_left
          </i>
        ) : null}
        <div className="page_number white-text">{page}</div>
        {nextDataLength > 20 && (
          <i
            className="arrow material-icons white-text btn"
            onClick={() => changePage(1)}
          >
            keyboard_arrow_right
          </i>
        )}
      </div>
      <Link
        to={`${pageBack}`}
        style={style}
        className="word_card__btn btn waves-effect waves-light black-text"
      >
        {language === 'en' ? 'Back' : 'Назад'}
      </Link>
    </div>
  );
};

const styles = {
  btnGreen: {
    backgroundColor: '#95D97D',
  },
  btnBlue: {
    backgroundColor: '#7FCEFB',
  },
  btnPink: {
    backgroundColor: '#F4A4A4',
  },
};
