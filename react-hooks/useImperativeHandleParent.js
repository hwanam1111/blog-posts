import React, { useRef } from 'react';

import ChildrenInput from './useImperativeHandleChildren';

const UseImperativeHandleDemoParent = () => {
  const inputRef = useRef();

  return (
    <>
      <ChildrenInput ref={inputRef} />
      <button onClick={() => inputRef.current.childrenFocus()}>input focus</button>
    </>
  );
};

export default UseImperativeHandleDemoParent;
