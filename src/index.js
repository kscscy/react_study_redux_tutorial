import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './modules';

// 스토어 생성하기
// 크롬 확장 프로그램 설치 후, composeWithDevTools 사용
const store = createStore(rootReducer, composeWithDevTools())

/**
 * 리액트 컴포넌트에서 스토어를 이용할 수 있도록 App 컴포넌트를
 * react-redux 에서 제공하는 Provider 컴포넌트로 감싸주기
 * 이 컴포너트를 사용할 떄는 store를 props로 전달해 주어야 한다
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
