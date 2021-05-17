import React, { useState } from 'react';

const UseStateDemo = () => {
  const [count, setCount] = useState(0);

  // 컴포넌트가 처음 렌더링 될 때만 실행
  const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props);
    return initialState;
  });

  return (
    <>
      <button type="button" onClick={() => setCount(count + 1)}>+1</button>
      <button type="button" onClick={() => setCount(count - 1)}>-1</button>
      <p>현재 카운터 값 : {count}</p>
    </>
  );
};

export default UseStateDemo;
