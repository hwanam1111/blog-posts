2022년 3월 29일자로 React 18 버전이 출시되면서

17버전에서 사용되던 ReactDOM.render등 몇가지가 지원이 중단되었습니다.

**ReactDOM.render**

**ReactDOM.hydrate**

**ReactDOM.unmountComponentAtNode**

**ReactDOM.renderSubtreeIntoContainer**

그래서 기존 React 17에서 사용되던 ReactDOM.render 대신 18 버전에 맞게 변경해주면 해당 Warning이 해결됩니다.

```javascript
// React 17

import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
```

```javascript
// React 18

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```
