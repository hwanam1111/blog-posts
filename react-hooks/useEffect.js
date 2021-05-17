import React, { useEffect } from 'react';

const UseEffectDemo = () => {
  useEffect(() => {
    console.log('렌더링이 될 때 마다 실행됩니다.');
  });

  useEffect(() => {
    console.log('처음 렌더링 될 때만 실행됩니다.');
  }, []);

  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('count 값이 업데이트 될 때 실행됩니다.');
  }, [count]);

  return (
    <>
      <button type="button" onClick={() => setCount(count + 1)}>+1</button>
      <button type="button" onClick={() => setCount(count - 1)}>-1</button>
      <p>현재 카운터 값 : {count}</p>
    </>
  );
};

export default UseEffectDemo;
