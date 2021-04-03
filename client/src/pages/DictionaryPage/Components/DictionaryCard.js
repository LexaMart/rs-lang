import React from 'react';

import { useRouteMatch, Link } from 'react-router-dom';

import { LANGUAGE_CONFIG } from '../../../shared/words-config';
import { DictionaryLoader } from '../../../components/Loader';

import { Card, Row, Col, Icon } from 'react-materialize';

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

export const DictionaryCard = ({
  title = 'Изучаемые слова',
  language = 'en',
  index = 0,
  handleClick,
  number,
  isLoader = false,
}) => {
  const style =
    index === 0
      ? styles.btnGreen
      : index === 1
      ? styles.btnBlue
      : styles.btnPink;

  const name = index === 0 ? 'learning' : index === 1 ? 'hard' : 'deleted';
  let { url } = useRouteMatch();
  return (
    <Row>
      <Col s={12}>
        <Card
          className="darken-1 card__item"
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName="black-text"
          title={title}
        >
          <Col s={12} className="card__amount">
            {isLoader && <DictionaryLoader />}
            {!isLoader && (
              <span className="black-text">
                {language === LANGUAGE_CONFIG.foreign ? 'Amount' : 'Кол-во'} :{' '}
                {number[index]}
              </span>
            )}
          </Col>
          <Col s={12} className="card__btn">
            <Link
              to={`${url}/${name}`}
              className="btn waves-effect waves-light black-text"
              onClick={() => handleClick(index)}
              style={style}
            >
              {language === LANGUAGE_CONFIG.foreign ? 'View' : 'Просмотреть'}
            </Link>
          </Col>
        </Card>
      </Col>
    </Row>
  );
};
