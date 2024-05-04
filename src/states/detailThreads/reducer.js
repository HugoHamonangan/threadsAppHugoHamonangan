import { ActionType } from './action'

function showDetailThreadsReducer (detailThreads = [], action = {}) {
  switch (action.type) {
    case ActionType.SHOW_DETAIL_THREADS:
      return action.payload !== undefined ? action.payload : detailThreads
    default:
      return detailThreads
  }
}

export default showDetailThreadsReducer
