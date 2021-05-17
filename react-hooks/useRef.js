import React, { useRef } from 'react';

const UseRefDemo = () => {
  const inputEl = useRef(null);
  const onClickBtn = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputEl} />
      <button onClick={onClickBtn}>Input Focus</button>
    </>
  );
}

export default UseRefDemo;