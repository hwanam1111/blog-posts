import React, { useContext } from 'react';
import { LanguageContext } from './useContextParent';

const UseContextDemoChildren = () => {
  const language = useContext(LanguageContext);

  return (
    <>
      {language}
    </>
  );
};

export default UseContextDemoChildren;
