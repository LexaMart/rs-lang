import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Card, Row, Col, Icon } from 'react-materialize';

import { getUserWord } from '../../services/getAllWords';
import { DictionaryLoader } from '../../components/Loader';
import { Progress } from '../../components/Progress';

import './Dictionary.css';

const DictionaryCard = (theme) => {
  return (
    <Row>
      <Col s={12}>
        <Card
          className="darken-1 card__item"
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName="black-text"
          title="Изучаемые слова"
        >
          <Row>
            <Col s={12} className="card__amount">
              <span className="black-text">Кол-во : 13</span>
            </Col>
            <Col s={12} className="card__btn">
              <Button
                node="button"
                waves="light"
                style={theme}
                className="black-text"
              >
                Просмотреть
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export const Dictionary = () => {
  const language = useSelector((store) => store.settingsStore.activeLanguage);
  const { userData } = useSelector((store) => store.authStore);

  const [isLoadingWords, setLoadingWords] = useState(true);
  const [userWords, setUserWords] = useState([]);

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

  return (
    <div className="dictionary valign-wrapper">
      <Row>
        {isLoadingWords && <DictionaryLoader />}
        <Col s={12}>{!isLoadingWords && <Progress />}</Col>

        <Col s={12}>
          <Row>
            <Col s={4}>{DictionaryCard(styles.btnGreen)}</Col>
            <Col s={4}>{DictionaryCard(styles.btnBlue)}</Col>
            <Col s={4}>{DictionaryCard(styles.btnPink)}</Col>
          </Row>
        </Col>
      </Row>
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
