import { ActionType } from './action'

function addThreadsReducer (threads = [], action) {
  switch (action.type) {
    case ActionType.ADD_THREADS:
      return action.payload
    default:
      return threads
  }
}

export default addThreadsReducer
