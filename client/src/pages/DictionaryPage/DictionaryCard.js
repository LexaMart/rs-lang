import React from 'react';
import { LANGUAGE_CONFIG } from '../../shared/words-config';

import { Button, Card, Row, Col, Icon } from 'react-materialize';

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
}) => {
  const style =
    index === 0
      ? styles.btnGreen
      : index === 1
      ? styles.btnBlue
      : styles.btnPink;

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
          <Row>
            <Col s={12} className="card__amount">
              <span className="black-text">
                {language === LANGUAGE_CONFIG.foreign ? 'Amount' : 'Кол-во'} :
                13
              </span>
            </Col>
            <Col s={12} className="card__btn">
              <Button
                node="button"
                waves="light"
                style={style}
                className="black-text"
                onClick={() => handleClick(index)}
              >
                {language === LANGUAGE_CONFIG.foreign ? 'View' : 'Просмотреть'}
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
