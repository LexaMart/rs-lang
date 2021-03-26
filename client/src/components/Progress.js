import { Row, Col, ProgressBar } from 'react-materialize';
import flagUK from '../assets/images/united-kingdom-1.svg';

export const Progress = () => {
  return (
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
  );
};
