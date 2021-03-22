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

const DictionaryCard = () => {
  return (
    <Row>
      <Col s={12}>
        <Card
          className="darken-1"
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName="black-text"
          title="Изучаемые слова"
        >
          <Row>
            <Col s={12}>
              <span className="black-text">Кол-во : 13</span>
            </Col>
            <Col s={12}>
              <Button node="button" waves="light">
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
    <div className="dictionary">
      <div className="container">
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
                      <Col s={12}>
                        <span className="white-text">1253 из 3600</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col s={2}>
                    <span style={{ color: '#FAFC96' }}>37%</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col s={12}>
            <Row>
              <Col s={4}>{DictionaryCard()}</Col>
              <Col s={4}>{DictionaryCard()}</Col>
              <Col s={4}>{DictionaryCard()}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
