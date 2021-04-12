import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useParams, useRouteMatch, Link } from 'react-router-dom';

import { getUserWordID } from '../../../services/getAllWords';
import urls from '../../../assets/constants/ursl';
import { DictionaryLoader } from '../../../components/Loader';
import { LANGUAGE_CONFIG, WORDS_CATEGORIES, WORDS_CONFIG } from '../../../shared/words-config';

import Popup from '../../MainPage/Popup';

const DictionaryWordCard = ({
  element,
  token,
  hard = false,
  currentWord,
  modalActive,
  isWordRecovery,
}) => {
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
    <div
      className={`word_card word_card__dictionary ${addGroupClascsName()}`}
      onClick={() => {
        currentWord(userWord);
        modalActive(true);
        isWordRecovery(hard ? true : false);
      }}
    >
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
  token,
  language = 'en',
  nameList,
  pageRender,
  isPageRender,
}) => {
  let { list } = useParams();
  let { path } = useRouteMatch();

  const userLearningWords = useSelector(
    (store) => store.authStore.userLearningWords
  );
  const userHardWords = useSelector((store) => store.authStore.userHardWords);
  const userDeletedWords = useSelector(
    (store) => store.authStore.userDeletedWords
  );

  const [page, setPage] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  const [isWordRecovery, setWordRecovery] = useState(false);
  const [currWord, setCurrWord] = useState({
    word: '',
    textMeaning: '',
    textExample: '',
  });

  useEffect(() => {
    if (isPageRender) {
      pageRender(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageRender]);

  const style =
    nameList === 'learning'
      ? styles.btnGreen
      : nameList === WORDS_CATEGORIES
      ? styles.btnBlue
      : styles.btnPink;

  const getTitle = () => {
    const arrName =
      language === LANGUAGE_CONFIG.native
        ? WORDS_CONFIG.DICTIONARY_CARD_TITLE.native
        : WORDS_CONFIG.DICTIONARY_CARD_TITLE.foreign;
    return list === 'learning'
      ? arrName[0]
      : list === WORDS_CATEGORIES.hard
      ? arrName[1]
      : arrName[2];
  };

  const pageBack = path.replace(/\/:list/g, '');

  const getItemHard = (el) => {
    return userHardWords ? userHardWords.includes(el) : null;
  };

  const currentDataList = () => {
    let data = [];
    list === 'learning'
      ? (data = [...userLearningWords, ...userHardWords])
      : list === WORDS_CATEGORIES.hard
      ? (data = userHardWords)
      : (data = userDeletedWords);

    return data;
  };

  const dataListWords = currentDataList();
  const dataListWordsForPage = currentDataList().slice(
    20 * (page - 1),
    20 * page
  );

  const changePage = (incr) => {
    const nextPage = page + incr;
    setPage(nextPage);
  };

  return (
    <div className="word_container__lists">
      <h3 className="word_container__title white-text">{getTitle()}</h3>
      <div className="word_container">
        {dataListWordsForPage.map((el) => {
          const hard = getItemHard(el);
          return (
            <DictionaryWordCard
              element={el}
              token={token}
              key={el}
              hard={hard}
              currentWord={setCurrWord}
              modalActive={setModalActive}
              isWordRecovery={setWordRecovery}
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
        <div className="page_number white-text">
          {dataListWords.length === 0
            ? language === 'en'
              ? 'No Words'
              : 'Нет слов'
            : page}
        </div>
        {dataListWords.length > 20 * page && (
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
      <Popup
        active={modalActive}
        setActive={setModalActive}
        currElement={currWord}
        isDeleted={list === WORDS_CATEGORIES.deleted || isWordRecovery}
        pageRender={pageRender}
      />
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
