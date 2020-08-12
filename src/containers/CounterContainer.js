//리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 부릅니다.
import React, { useCallback } from 'react'
import Counter from '../components/Counter'
import { useSelector, useDispatch } from 'react-redux'
import { increase, decrease } from '../modules/counter'

// const CounterContainer = ({ number, increase, decrease }) => {
//   return (
//     <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//   )
// }
// export default CounterContainer

/**
 * 위 컴포넌트를 리덕스와 연동하려면 react-redux에서 제공하는 connect 함수를 사용해야 합니다.
 * 이 함수는 다음과 같이 사용합니다.
 *
 * connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
 *
 * 여기서 mapStateToProps는 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수이고,
 * mapDispatchToProps는 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수입니다.
 *
 * 이렇게 connect 함수를 호출하고 나면 또 다른 함수를 반환합니다.
 * 반환된 함수에 컴포넌트를 파라미터로 넣어 주면 리덕스와 연동된 컴포넌트가 만들어집니다.
 * 위 코드를 더 쉽게 풀면 다음과 같은 형태입니다.
 *
 * const makeContainer = connect(mapStateToProps, mapDispatchToProps)
 * makeContainer(타깃 컴포넌트)
 *
 * mapStateToProps와 mapDispatchProps에서 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달됩니다.
 * mapStateToProps는 state를 파라미터로 받아 오며,
 * 이 값은 현재 스토어가 지니고 있는 상태를 가리킵니다.
 * mapDispatchToProps의 경우 store의 내장 함수 dispatch를 파라미터로 받아 옵니다.
 * 현재 mapDispatchToProps에서는 진행 절차를 설명하기 위해 임시로 console.log를 사용하고 있습니다.
 */

/**
 * #1
 */
// const mapStateToProps = state => ({
//   number: state.counter.number
// })
// const mapDispatchToProps = dispatch => ({
//   // 임시 함수
//   increase: () => {
//     console.log('increase!')
//     dispatch(increase())
//   },
//   decrease: () => {
//     console.log('decrease!!')
//     dispatch(decrease())
//   }
// })
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CounterContainer)

/**
 * connect 함수를 사용할 때는 일반적으로 위 코드와 같이 mapStateToProps와 mapDispatchToProps를 미리 선언해 놓고 사용합니다. 
 * 하지만 connect 함수 내부에 익명 함수 형태로 선언해도 문제가 되지 않습니다. 
 * 어떻게 보면 코드가 더 깔끔해지기도 하는데요. 취향에 따라 다음과 같이 작성해도 됩니다.
 */

/**
 * #2 익명 함수
 */
// export default connect(
//   state => ({
//     number: state.counter.number
//   }),
//   dispatch => ({
//     increase: () => dispatch(increase()),
//     decrease: () => dispatch(decrease())
//   })
// )(CounterContainer)


/**
 * 컴포넌트에서 액션을 디스패치하기 위해 각 액션 생성 함수를 호출하고 dispatch로 감싸는 작업이 조금 번거로울 수도 있습니다. 
 * 특히 액션 생성 함수의 개수가 많아진다면 더더욱 그럴 것입니다. 
 * 이와 같은 경우에는 리덕스에서 제공하는 bindActionCreators 유틸 함수를 사용하면 간편합니다.
 * 위와 같이 두 번째 파라미터를 아예 객체 형태로 넣어 주면 connect 함수가 내부적으로 bindActionCreators 작업을 대신해 줍니다.
 */

/**
 * #3 bindActionCreators
 */
//  export default connect(
//    state => ({
//      number: state.counter.number
//    }),
//    dispatch =>
//     bindActionCreators(
//       {
//         increase,
//         decrease
//       },
//       dispatch
//     )
//  )(CounterContainer)

/**
 * #4-1 useSelector Hook 사용하기
 * useSelecto Hook 을 사용하면 connect 함수를 사용하지 않고도 리덕스의 상태를 조회할 수 있다.
 * const 결과 = useSelector(상태 선택 함수)
 * 여기서 상태 선택 함수는 mapStateToProps와 형태가 똑같다.
 */
// const CounterContainer = () => {
//   const number = useSelector(state => state.counter.number)
//   const dispatch = useDispatch()
//   return (
//     <Counter
//       number={number}
//       onIncrease={() => dispatch(increase())}
//       onDecrease={() => dispatch(decrease())}
//     />
//   )
// }

/**
 * #4-2 컴포넌트 성능을 최적화해야 하는 상황이 온다면 
 * useCallback 으로 액션을 디스패치 하는 함수를 감싸주는 것이 좋다
 */
const CounterContainer = () => {
  const number = useSelector(state => state.counter.number)
  const dispatch = useDispatch()
  const onIncrease = useCallback(() => { dispatch(increase()) }, [dispatch])
  const onDecrease = useCallback(() => { dispatch(decrease()) }, [dispatch])
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  )
}

export default CounterContainer


