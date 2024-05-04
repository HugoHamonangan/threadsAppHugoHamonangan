import { ActionType } from './action'

function likeThreadReducer (likeThreads = [], action = {}) {
  switch (action.type) {
    case ActionType.LIKE_THREADS:
      return [
        ...likeThreads,
        likeThreads.payload
      ]
    case ActionType.DISLIKE_THREADS:
      return [
        ...likeThreads,
        likeThreads.payload
      ]

    default:
      return likeThreads
  }
}

export default likeThreadReducer
