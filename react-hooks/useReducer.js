import React, { useReduce } from 'react';

function countReducer(countState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { value: countState.value + 1 };
    case 'DECREMENT':
      return { value: countState.value - 1 };
    default:
      return state;
  }
}

const UseReducerDemo = () => {
  const [countState, countDispatch] = useReducer(countReducer, { value: 0 });

  return (
    <>
      <button type="button" onClick={() => countDispatch({ type: 'INCREMENT' })}>+1</button>
      <button type="button" onClick={() => countDispatch({ type: 'DECREMENT' })}>-1</button>
      <p>현재 카운터 값 : {countState.value}</p>
    </>
  );
};

export default UseReducerDemo;
