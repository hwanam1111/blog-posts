import React, { useState, createContext } from 'react';

const LanguageContext = createContext('en');

const UseContextDemoParent = () => {
  const [language, setLanguage] = useState('ko');

  return (
    <LanguageContext.Provider value={language}>
      <button type="button" onClick={() => setLanguage('ko')}>한국어</button>
      <button type="button" onClick={() => setLanguage('en')}>English</button>
    </LanguageContext.Provider>
  );
};

export default UseContextDemoParent;
