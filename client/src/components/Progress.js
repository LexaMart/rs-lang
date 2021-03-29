import { Row, Col, ProgressBar } from 'react-materialize';
import flagUK from '../assets/images/united-kingdom-1.svg';

const TOTAL_WORDS = 100;
export const Progress = ({ title, language, total = 0 }) => {
  const translate = language === 'en' ? 'of' : 'из';
  const percent = Math.floor((total / TOTAL_WORDS) * 100);
  return (
    <Row className="dictionary__progress">
      <Col m={6} s={12}>
        <Row className="center-align">
          <Col s={12}>
            <h4 className="white-text">{title}</h4>
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
                  <ProgressBar progress={percent} />
                </Col>
              </Col>
              <Col s={12} className="dictionary__progress-number">
                <span className="white-text">
                  {total} {translate} {TOTAL_WORDS}
                </span>
              </Col>
            </Row>
          </Col>
          <Col s={2} className="dictionary__progress-number">
            <span style={{ color: '#FAFC96' }}>{percent} %</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
