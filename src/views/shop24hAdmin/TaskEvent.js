const initialState = {
  taskInput: '',
  tableDetail: [],
  filter: '',
}

const TaskEvent = (state = initialState, action) => {
  switch (action.type) {
    case 'TASK_INPUT':
      return {
        ...state,
        taskInput: action.input,
      }
    case 'BTN_FILTER':
      return {
        ...state,
        filter: action.filter,
      }

    default:
      return state
  }
}

export default TaskEvent
