import React from 'react';

import {
  Button,
  Card,
  Row,
  Col,
  Icon,
  Collapsible,
  CollapsibleItem,
  ProgressBar,
} from 'react-materialize';

import './Dictionary.css';
import flagUK from '../../assets/images/united-kingdom-1.svg';

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
  return (
    <div className="dictionary valign-wrapper">
      <Row>
        <Col s={12}>
          <Row className="dictionary__progress">
            <Col m={6} s={12}>
              <Row className="center-align">
                <Col s={12}>
                  <h4 className="white-text">Прогресс изучения слов</h4>
                </Col>
                <Col s={12}>
                  <img src={flagUK} alt="flagUK" />
                </Col>
              </Row>
            </Col>

            <Col m={6} s={12}>
              <Row className="center-align">
                <Col s={10}>
                  <Row>
                    <Col s={12}>
                      <Col s={12}>
                        <ProgressBar progress={37} />
                      </Col>
                    </Col>
                    <Col s={12} className="dictionary__progress-number">
                      <span className="white-text">1253 из 3600</span>
                    </Col>
                  </Row>
                </Col>
                <Col s={2} className="dictionary__progress-number">
                  <span style={{ color: '#FAFC96' }}>37%</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

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
