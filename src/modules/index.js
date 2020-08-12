import { combineReducers } from 'redux'
import counter from './counter'
import todos from './todos'

/**
 * 루트 리듀서 만들기
 * 나중에 createStore 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사요해야 한다.
 * 기존에 만들었던 리듀서를 하나로 합쳐줘야 한다.
 * 리덕스에서 제공하는 combineReducers 함수를 사용한다.
 */

const rootReducer = combineReducers({
  counter,
  todos
})

export default rootReducer
