import { createAction, handleActions } from "redux-actions"
import produce from "immer"

/**
 * 액션 타입 정의
 */
const CHANGE_INPUT = 'todos/CHANGE_INPUT' // input 값을 변경함
const INSERT = 'todos/INSERT' // 새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE' // todo를 체크/체크 해제함
const REMOVE = 'todos/REMOVE' // todo를 제거함

let id = 3 // insert 가 호출될 때마다 1씩 더해집니다

/**
 * 액션 생성 함수 만들기 #1
 * 소괄호로 감싸면 바로 return
 */
// export const changeInput = input => ({
//   type: CHANGE_INPUT,
//   input
// })

// export const insert = text => {
//   return {
//     type: INSERT,
//     todo: {
//       id: id++,
//       text,
//       done: false
//     }
//   }
// }

// export const toggle = (id) => ({
//   type: TOGGLE,
//   id
// })

// export const remove = (id) => ({
//   type: REMOVE,
//   id
// })

/**
 * 액션 생성 함수 만들기 #2
 * insert의 경우 todo 객체를 액션 객체 안에 넣어 주어야 하기 때문에 
 * 두 번째 파라미터에 text를 넣으면 todo 객체가 반환되는 함수를 넣어 주었습니다
 */
export const changeInput = createAction(CHANGE_INPUT, input => input)

export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false
}))

/**
 * id => id와 같은 형태로 파라미터를 그대로 반환 하는 함수.
 * 이 작업은 필수 작업이 아니며, 생략 가능하다. createAction(TOGGLE) // 액션 타입명만
 * 여기서 이 함수를 넣어 줌으로써 코드를 보았을 때 이 액션 생성 함수의 파라미터로 어떤 값이 필요한지 쉽게 파악 가능
 */
export const toggle = createAction(TOGGLE)
export const remove = createAction(REMOVE, id => id)

/**
 * todos 모듈의 초기 상태
 */
const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: 'redux 기초 배우기',
      done: true
    },
    {
      id: 2,
      text: 'react와 redux 사용하기',
      done: false
    }
  ]
}

/**
 * 리듀서 함수 만들기 #1
 */
// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input
//       }
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo)
//       }
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map(todo =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo
//         )
//       }
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter(todo => todo.id !== action.id)
//       }
//     default:
//       return state
//   }
// }

/**
 * 리듀서 함수 만들기 #2-1
 * 액션 생성 함수는 액션에 필요한 추가 데이터를 모두 payload라는 이름으로 사용하기 때문에 
 * action.id, action.todo를 조회하는 대신, 모두 공통적으로 action.payload 값을 조회하도록 리듀서를 구현해 주어야 합니다.
 */
// const todos = handleActions(
//   {
//     [CHANGE_INPUT]: (state, action) => ({ ...state, input: action.payload }),
//     [INSERT]: (state, action) => ({
//       ...state,
//       todos: state.todos.concat(action.payload),
//     }),
//     [TOGGLE]: (state, action) => ({
//       ...state,
//       todos: state.todos.map(todo =>
//         todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
//       ),
//     }),
//     [REMOVE]: (state, action) => ({
//       ...state,
//       todos: state.todos.filter(todo => todo.id !== action.payload),
//     }),
//   },
//   initialState
// )


/**
 * 리듀서 함수 만들기 #2-2
 * 모든 추가 데이터 값을 action.payload 로 사용하기 때문에 나중에 리듀서 코드를 다시 볼 때 햇갈릴 수 있다.
 * 객체 비구조화 할당 문법으로 action값의 payload 이름을 새로 설정해주면
 * action.payload 가 정확히 어떤 값을 의미하는지 더 쉽게 파악할 수 있다.
 */
// const todos = handleActions(
//   {
//     [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
//     [INSERT]: (state, { payload: todo }) => ({
//       ...state,
//       todos: state.todos.concat(todo)
//     }),
//     [TOGGLE]: (state, { payload: id }) => ({
//       ...state,
//       todos: state.todos.map(todo =>
//         todo.id === id ? { ...todo, done: !todo.done } : todo
//       )
//     }),
//     [REMOVE]: (state, { payload: id }) => ({
//       ...state,
//       todos: state.todos.filter(todo => todo.id !== id)
//     })
//   },
//   initialState
// )

/**
 * 리듀서 함수 만들기 #3
 * immer 사용하기
 */

const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, draft => {
        draft.input = input
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, draft => {
        draft.todos.push(todo)
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, draft => {
        const todo = draft.todos.find(todo => todo.id === id)
        todo.done = !todo.done
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, draft => {
        const index = draft.todos.findIndex(todo => todo.id === id)
        draft.todos.splice(index, 1)
      })
  },
  initialState
)


export default todos