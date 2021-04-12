import React from 'react';
import { Col, Preloader } from "react-materialize";
import FadeLoader from 'react-spinners/FadeLoader';
export const DictionaryLoader = ({ color = 'rgba(240, 138, 93, 1)' }) => {
  return (
    <div className="loader">
      <FadeLoader
        color={color}
        loading={true}
        height={15}
        width={5}
        radius={2}
        margin={2}
      />
    </div>
  );
};

export const MainPagePreloader = () => {
  return (
    <div style={{ height: '84.4vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Col s={4}>
        <Preloader
          active
          color="yellow"
          flashing={false}
          size="big"
        />
      </Col>
    </div>
  )
}
