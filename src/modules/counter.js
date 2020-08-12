import { createAction, handleActions } from "redux-actions"

/**
 * 액션 정의
 */
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

/**
 * 액션 함수 만들기 (export는 여러개 가능) #1
 */
// export const increase = () => ({ type: INCREASE })
// export const decrease = () => ({ type: DECREASE })

/**
 * 액션 함수 만들기 #2
 * createAction 이용하기
 * createAction을 사용하면 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액션 생성 함수를 선언할 수 있습니다.
 */
export const increase = createAction(INCREASE)
export const decrease = createAction(DECREASE)

/**
 * counter 모듈의 초기 상태
 */
const initialState = {
  number: 0
}

/**
 * 리듀서 함수 만들기 #1
 */
// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1
//       }
//     case DECREASE:
//       return {
//         number: state.number - 1
//       }
//     default:
//       return state
//   }
// }

/**
 * 리듀서 함수 만들기 #2
 */
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 })
  },
  initialState
)

// export default는 단 한개만 내보내기 가능
export default counter