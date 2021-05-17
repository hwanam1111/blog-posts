# React Hooks

> React v16.8부터 함수형 컴포넌트에서도 컴포넌트 상태, 생명주기를 관리할 수 있는 Hooks API를 지원합니다.  

---

## React v16.8이전의 클래스형 컴포넌트와 함수형 컴포넌트

### 클래스형 컴포넌트  

- State를 가지고 있어 상태 변화에 대한 관리 가능가 가능하다.
- 리액트 라이프 사이클 API를 사용한다.

### 함수형 컴포넌트

- State, LifeCycle 관련 기능 사용이 불가능하다.
- 메모리 자원을 함수형 컴포넌트보다 덜 사용한다.
- 컴포넌트 선언이 편하다.

하지만 React Hook이 나옴으로서 클래스 컴포넌트에서 사용 가능했던 State, LifeCycle API를 사용할 수 있게 되었습니다.

---

## Hooks API가 나온 배경

기존의 클래스형 컴포넌트에는 단점들이 존재합니다.

1. Stateful코드의 재사용성이 좋지 않습니다.  
High-Order Components(고차 컴포넌트), render props를 이용해서 재사용을 할 수 있지만, 코드 추적이 힘들어지며, Devtools에서 디버깅시 Wrapper Hell에 쉽게 빠질 수 있습니다.

2. 클래스가 주는 혼동이 있습니다.  
Javascript에서 `this`가 동작하는 방법은 다른 언어에서 `this`가 동작하는 방법과는 다릅니다.  
그래서 메서드를 bind하거나 화살표 함수를 클래스의 프로퍼티로 추가해야만 했습니다.

3. 중복된 로직이 자주 사용됩니다.  
클래스형 컴포넌트에서 사용할 수 있는 라이프사이클 API는 종종 중복되는 로직을 각각 넣어주어야 하는 경우가 있습니다.
`componentDidMount`, `componentDidUpdate`로 데이터를 가져올 때 동일한 API 호출 함수를 실행해야하는 경우가 종종 있습니다.

위 문제점을 해결하기 위해서 Hooks API가 탄생하게 되었습니다.

---

## Hooks API

Hooks API에는 `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, `useCallback`, `useRef`, `useImperativeHandle`, `useLayoutEffect`, `useDebugValue` 총 10가지의 API를 지원합니다.  
> Hooks API Reference 공식 문서 : [https://ko.reactjs.org/docs/hooks-reference.html](https://ko.reactjs.org/docs/hooks-reference.html)

### useState

```javascript
const [state, setState] = useState(initialState);
```

함수형 컴포넌트에서도 상태값을 가지고 있을 수 있게 해주는 함수입니다.  
useState의 인자로는 상태의 초기값을 설정 할 수 있습니다.  
반환된 배열의 첫 번째 요소에는 현재 상태가 들어있으며, 두 번째 요소에는 상태를 변경할 수 있는 함수가 들어있습니다.  

```javascript
import React, { useState } from 'react';

const UseStateDemo = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setCount(count + 1)}>+1</button>
      <button type="button" onClick={() => setCount(count - 1)}>-1</button>
      <p>현재 카운터 값 : {count}</p>
    </>
  );
};

export default UseStateDemo;
```

만약 복잡한 연산이 필요한 로직의 결과값을 초기값으로 사용하면 렌더링이 될 때마다 복잡한 연산이 동작 할 것입니다.  
이때 useState에 아래와 같이 함수를 넘겨주면 함수에서 반환하는 값이 초기값으로 설정되며, 첫번째 렌더링에서만 실행이 됩니다.

```javascript
// 컴포넌트가 처음 렌더링 될 때만 실행
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

### useEffect

```javascript
useEffect(didUpdate);
```

이 함수 안에서는 사이드 이펙트, 타이머 등을 수행할 수 있습니다.  
기본적으로는 모든 렌더링이 완료된 후에 수행되지만, 어떤 값이 변했을 때만 실행되게 할 수 있습니다.

첫 번째 인자로는 함수를 받으며, 두 번째 인자로는 검사하고 싶은 값을 배열형태로 넣어주면 됩니다. 만약 배열에 빈값을 넣어주면 컴포넌트가 화면에 맨 처음 렌더링 될 때만 실행됩니다.

```javascript
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
```

`useEffect`는 렌더링이 되고난 직후마다 실행되며, 두 번째 인자 값을 어떻게 하냐에 따라 실행 조건이 달라집니다.  
메모리 누수를 방지하기 위해서 UI에서 컴포넌트를 제거하기 전에 수행됩니다.  
만약 컴포넌트가 여러번 렌더링 된다면 다음 Effect가 수행되기 이전 Effect가 정리됩니다.  
만약 컴포넌트가 unmount되기 전, 업데이트 되기 전에 작업을 수행하고 싶으면 Effect를 정리해줘야 합니다.  
구독을 생성하는 예시입니다.

```javascript
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```

### useContext

```javascript
const value = useContext(MyContext);
```

옛날에는 공식문서에서 사용하지 말라고 했었지만 `React.createContext`, 'useContext'가 나오면서 다시 많이 사용을 합니다.  
컴포넌트 구조가 1 -> 2 -> 3 이라고 가정하면 1 -> 3으로 데이터를 보내주려면 1 -> 2 -> 3 순서로 컴포넌트를 모두 거치지 않고도 context api를 사용하면 1 -> 3으로 데이터를 보낼 수 있습니다.  

`React.createContext`로 생성된 컨텍스트 객체를 인자로 받으며, 컨텍스트의 현재값을 반환합니다.  
createContext에 공유하길 원하는 데이터의 초기 값을 넣고 value 변수로 지정합니다.  

다국어 페이지 예시입니다.  

```javascript
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
```

```javascript
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
```

사용할 때 주의점은 Provider에 value값이 달라지만 useContext를 사용하고있는 모든 컴포넌트가 리렌더링됩니다.  
컴포넌트의 리렌더링 비용이 커진다면 메모이제이션으로 최적화를 해주어야 할 것입니다.

### useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

`useState`의 대안으로 나온 메서드입니다.  
조금더 복잡한 상태 관리가 필요할 때 `useState`대신 `useReducer`를 사용합니다.  

reducer는 현재 상태, 업데이트에 필요한 정보를 담은 action값을 받아 새로운 상태를 받는 메서드입니다.  
reducer를 사용할 때 주의할 점은 새로운 상태를 만들 때 불변성을 지키며 만들어야합니다.  

그리고 `useState`와 마찬가지로 현재 상태와 이전 상태가 같으면 리렌더링을 하지 않습니다.  

카운터를 통한 예시입니다.

```javascript
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
```

### useMemo

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

리액트는 기본적으로 state값이 변할 때 마다 리렌더링이 이루어집니다.  
문제는 state의 값 중에 하나라도 변경이 되면 리렌더링이 됩니다.  
`useMemo`는 특정 state값이 변했을 때만 리렌더링을 하고 그게 아닐 때는 캐싱되어있는 결과를 사용하여 최적화를 시켜줍니다.  

또한 렌더링 과정에서 넘겨받은 함수를 실행합니다.  
렌더링 과정에서 해서 안되는 것을 `useMemo`에 넘기는 콜백함수에 작성하면 안됩니다.  
예시로 로직에 사이드 아펙트가 포함되어 있으면 `useEffect`를 사용해야합니다.  

그리고 공식문서에서는 먼저 `useMemo`없이 코드가 작동되게 하고, 최적화 단계에서 `useMemo`를 사용하기를 권장하고 있습니다.

등록한 숫자들의 평균값을 구하는 예시입니다.

`useMemo`를 사용하지 않았더라면 input값이 onChange될 때도 getAverage가 호출 될 것 입니다.  
`useMemo`를 사용해서 numberList 배열이 변경될 때만 getAverage가 호출되게 하는 예시입니다.

```javascript
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
  }, [numberList])

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
```

### useCallback

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

`useMemo`와 비슷한 메서드입니다.  
주로 렌더링성능을 최적화 할 때 사용합니다.  
이벤트 핸들러 함수를 필요할 때만 생성 할 수 있는게 장점입니다.

첫번 째 파라미터에는 우리가 생성할 함수를 넣고, 두번 째 파라미터에는 어떤 값이 바뀌었을 때 함수를 새로 생성할지를 배열에 넣어주면 됩니다.

```javascript
import React, { useState } from 'react';

const getAverage = (numbers) => {
  if (numbers.length === 0) {
    return 0;
  }
  
  return (numbers.reduce((a, b) => a + b)) / numbers.length;
};

const UseCallbackDemo = () => {
  const [numberList, setNumberList] = useState([]);
  const [number, setNumber] = useState('');

  const onChangeInput = useCallback((evt) => {
    setNumber(evt.target.value);
  }, []);

  const onClickInsertBtn = useCallback(() => {
    const nextList = numberList.concat(parseInt(number));
    setNumberList(nextList);
    setNumber('');
  }, [number, numberList]);

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

export default UseCallbackDemo;
```

`useCallback`을 적용시킨 모습입니다.

```javascript
useCallback(() => {
  
}, [])

useMemo(() => {
  const memoFunc = () => {
    
  };
  return memoFunc;
}, [])
```

이 두개의 코드는 동일하게 작동합니다.  

일반 값(숫자, 문자, 객체)을 재사용 할 때는 `useMemo`, 함수를 재사용 할 때는 `useCallback`을 사용하면 됩니다.

### useRef

```javascript
const refContainer = useRef(initialValue);
```

`ref`는 생성된 DOM 노드나 React element에 접근할 때 사용합니다.
`useRef`는 DOM을 참조하는 용도 이외에도 컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리합니다.  

`useRef`로 관리하는 변수는 값이 바뀌어도 컴포넌트가 리렌더링이 되지 않으며, 변수를 설정 후에 바로 조회 할 수 있습니다.  

```javascript
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
```

### useImperativeHandle

```javascript
useImperativeHandle(ref, createHandle, [deps])
```

`ref`를 사용할 때 부모 컴포넌트에 노출되는 인스턴스의 값을 커스터마이즈합니다.  

아래 예제를 보면 input element에 childrenFocus라는 메서드가 없지만, `useImperativeHandle`에서 정의를 하였습니다.  
`useImperativeHandle`의 첫 번째 인자로는 프로퍼티를 부여할 ref를, 두 번째 인자에는 객체를 리턴하는 함수를 전달합니다.  
`useImperativeHandle`는 `forwardRef`와 같이 사용해야합니다.

```javascript
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
```

```javascript
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
```

리액트에서는 데이터가 부모 -> 자식으로 전달을 하는데, 보통 Redux, Context API등을 통해 단방향 데이터 흐름을 회피합니다.  
`useImperativeHandle`를 사용하는 방법도 있지만, 리액트에서는 ref를 남용하는것을 권장하지 않기에 잘 판단하여 필요한 곳에서 사용하면 좋을 것 같습니다.

### useLayoutEffect

`useEffect`와의 차이점은 실행 시점입니다.

`useEffect`의 경우 화면이 그려진 이후에 비동기 적으로 실행됩니다.  

`useLayoutEffect`는 화면이 그려지기 전에 동기적으로 실행되고 실행 후에 화면에 그려집니다.  

리액트 공식문서에는 `useEffect`를 먼저 사용하고 이슈가 있을 경우 `useLayoutEffect`를 사용하라고 합니다.

### useDebugValue

```javascript
useDebugValue(value)
```

리액트 개발자 도구에서 Hook 레이블을 표시할 때 사용합니다.  

커스컴 훅의 내부를 볼 수 있게 해줍니다.
