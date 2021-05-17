import React, { useImperativeHandle, forwardRef } from 'react';

const UseImperativeHandleDemoChildren = ({ props, ref }) => {

  useImperativeHandle(ref, () => ({
    childrenFocus: () => {
      ref.current.focus();
    }
  }));

  return (
    <>
      <input ref={inputRef} />
    </>
  );
};

export default forwardRef(UseImperativeHandleDemoChildren);
