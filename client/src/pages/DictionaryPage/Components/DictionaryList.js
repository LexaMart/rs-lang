import React, { useEffect, useState } from 'react';
import { getUserWordID } from '../../../services/getAllWords';
import urls from '../../../assets/constants/ursl';
import { DictionaryLoader } from '../../../components/Loader';

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
export const DictionaryList = ({ data = [], token }) => {
  return (
    <div className="word_container">
      {data &&
        data.map((el) => {
          return <DictionaryWordCard element={el} token={token} key={el} />;
        })}
    </div>
  );
};
