import React, { useState } from 'react';

const getAverage = (numbers) => {
  if (numbers.length === 0) {
    return 0;
  }
  
  return (numbers.reduce((a, b) => a + b)) / numbers.length;
};

const UseMemoDemo = () => {
  const [numberList, setNumberList] = useState([]);
  const [number, setNumber] = useState('');

  const onChangeInput = (evt) => {
    setNumber(evt.target.value);
  };

  const onClickInsertBtn = () => {
    const nextList = numberList.concat(parseInt(number));
    setNumberList(nextList);
    setNumber('');
  };

  const average = useMemo(() => {
    getAverage(numberList)
  }, [list])

  return (
    <div>
      <input type="number" value={number} onChange={onChangeInput} />
      <button onClick={onClickInsertBtn}>숫자 등록하기</button>
      <ul>
        {numberList.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
      <div>
        평균: {average}
      </div>
    </div>
  );
};

export default UseMemoDemo;
