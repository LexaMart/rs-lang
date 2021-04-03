import React from 'react';

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
