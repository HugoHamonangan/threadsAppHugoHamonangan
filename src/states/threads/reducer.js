import { ActionType } from './action'

const initialState = []

function showThreadReducer (threads = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_THREADS:
      return action.payload !== undefined ? action.payload : threads
    default:
      return threads
  }
}

export default showThreadReducer
