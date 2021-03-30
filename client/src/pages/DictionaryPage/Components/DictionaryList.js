import React, { useEffect, useState } from 'react';

import { useParams, useRouteMatch, Link } from 'react-router-dom';

import { getUserWordID } from '../../../services/getAllWords';
import urls from '../../../assets/constants/ursl';
import { DictionaryLoader } from '../../../components/Loader';
import { LANGUAGE_CONFIG, WORDS_CONFIG } from '../../../shared/words-config';

const DictionaryWordCard = ({ element, token }) => {
  const [userWord, setUserWord] = useState('');
  const [isLoader, setLoader] = useState(true);

  useEffect(() => {
    const words = async () => {
      await getUserWordID({
        token: token,
        wordId: element,
      }).then((res) => {
        setUserWord(res);
        setLoader(false);
      });
    };
    words();
  }, [element, token]);

  return (
    <div className="word_card">
      {isLoader && <DictionaryLoader />}
      {!isLoader && (
        <React.Fragment>
          <img
            src={urls.IMAGE + userWord.image}
            alt="wordimage"
            className="word_card_bg"
          />
          <div className="word">{userWord.word}</div>
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
  let { path, url } = useRouteMatch();

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
  const pageBack = path.replace(/\/\:list/g, '');
  console.log(path, url, pageBack, list);
  return (
    <div className="word_container__lists">
      <h3 className="word_container__title white-text">{getTitle()}</h3>
      <div className="word_container">
        {data &&
          data.map((el) => {
            return <DictionaryWordCard element={el} token={token} key={el} />;
          })}
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
