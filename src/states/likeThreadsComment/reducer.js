import { ActionType } from './action'

function likeThreadCommentReducer (likeThreadsComments = [], action = {}) {
  switch (action.type) {
    case ActionType.LIKE_THREADS:
      return [
        ...likeThreadsComments,
        likeThreadsComments.payload
      ]
    case ActionType.DISLIKE_THREADS:
      return [
        ...likeThreadsComments,
        likeThreadsComments.payload
      ]

    default:
      return likeThreadsComments
  }
}

export default likeThreadCommentReducer
