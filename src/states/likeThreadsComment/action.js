import api from '../../utils/api'

const ActionType = {
  LIKE_THREADS_COMMENT: 'LIKE_THREADS_COMMENT',
  DISLIKE_THREADS_COMMENT: 'DISLIKE_THREADS_COMMENT'
}

function likeThreadCreatorComment (likeThreadComment) {
  return {
    type: ActionType.LIKE_THREADS_COMMENT,
    payload: {
      likeThreadComment
    }
  }
}

function dislikeThreadCreatorComment (dislikeThreadComment) {
  return {
    type: ActionType.DISLIKE_THREADS_COMMENT,
    payload: {
      dislikeThreadComment
    }
  }
}

function asyncLikeThreadComment (threadId, commentId) {
  return async (dispatch) => {
    try {
      const { error, data } = await api.upVoteComment(threadId, commentId)
      if (!error) {
        dispatch(likeThreadCreatorComment(data))
      } else {
        console.error('Error fetching threads:', error)
      }
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncDislikeThreadComment (threadId, commentId) {
  return async (dispatch) => {
    try {
      const { error, data } = await api.downVoteComment(threadId, commentId)
      if (!error) {
        dispatch(dislikeThreadCreatorComment(data))
      } else {
        console.error('Error fetching threads:', error)
      }
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  ActionType,
  asyncLikeThreadComment,
  likeThreadCreatorComment,
  dislikeThreadCreatorComment,
  asyncDislikeThreadComment
}
