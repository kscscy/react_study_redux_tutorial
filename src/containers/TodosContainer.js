import React from 'react'
import Todos from '../components/Todos'
import { useSelector } from 'react-redux'
import { changeInput, insert, toggle, remove } from '../modules/todos'
import useActions from '../lib/useActions'

/**
 * #1 connect 사용하기
 */
// const TodosContainer = ({
//   input,
//   todos,
//   changeInput,
//   insert,
//   toggle,
//   remove
// }) => {
//   return (
//     <Todos
//       input={input}
//       todos={todos}
//       onChangeInput={changeInput}
//       onInsert={insert}
//       onToggle={toggle}
//       onRemove={remove}
//     />
//   )
// }

// export default connect(
//   // 비구조화 할당을 통해 todos를 분리하여
//   // state.todos.input 대신 todos.input을 사용
//   ({ todos }) => ({
//     input: todos.input,
//     todos: todos.todos
//   }),
//   {
//     changeInput,
//     insert,
//     toggle,
//     remove
//   }
// )(TodosContainer)

/**
 * #2 useSelector, useDispatch Hooks 사용하기
 * 이번에는 useSelector를 사용할 때 비구조화 할당 문법을 활용했습니다.
 * 또한, useDispatch를 사용할 때 각 액션을 디스패치하는 함수를 만들었는데요. 
 * 위 코드의 경우 액션의 종류가 많은데 
 * 어떤 값이 액션 생성 함수의 파라미터로 사용되어야 하는지 일일이 명시해 주어야 하므로 조금 번거롭습니다.
 */
// const TodosContainer = () => {
//   const { input, todos } = useSelector(({ todos }) => ({
//     input: todos.input,
//     todos: todos.todos
//   }))
//   const dispatch = useDispatch()
//   const onChangeInput = useCallback(input => dispatch(changeInput(input)),[dispatch])
//   const onInsert = useCallback(text => dispatch(insert(text)),[dispatch])
//   const onToggle = useCallback(id => dispatch(toggle(id)),[dispatch])
//   const onRemove = useCallback(id => dispatch(remove(id)),[dispatch])
//   return (
//     <Todos 
//       input={input}
//       todos={todos}
//       onChangeInput={onChangeInput}
//       onInsert={onInsert}
//       onToggle={onToggle}
//       onRemove={onRemove}
//     />
//   )
// }

/**
 * #3 useActions 사용하기
 */
const TodosContainer = () => {
  const {input, todos} = useSelector(({todos}) => ({
    input: todos.input,
    todos: todos.todos
  }))

  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  )
  return (
    <Todos 
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  )
}

// export default TodosContainer

/**
 * 앞으로 컨테이너 컴포넌트를 만들 때 connect 함수를 사용해도 좋고, useSelector와 useDispatch를 사용해도 좋습니다. 
 * 리덕스 관련 Hook이 있다고 해서 기존 connect 함수가 사라지는 것은 아니므로, 더 편한 것을 사용하면 됩니다.
 * 하지만 Hooks를 사용하여 컨테이너 컴포넌트를 만들 때 잘 알아 두어야 할 차이점이 있습니다. 
 * 
 * connect 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우, 
 * 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 해당 컨테이너 컴포넌트의 props가 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능이 최적화됩니다.
 * 
 * 반면 useSelector를 사용하여 리덕스 상태를 조회했을 때는 이 최적화 작업이 자동으로 이루어지지 않으므로, 
 * 성능 최적화를 위해서는 React.memo를 컨테이너 컴포넌트에 사용해 주어야 합니다. 다음과 같이 말이죠.
 */

export default React.memo(TodosContainer)