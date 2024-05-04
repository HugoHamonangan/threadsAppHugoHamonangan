import api from '../../utils/api'

const ActionType = {
  LIKE_THREADS: 'LIKE_THREADS',
  DISLIKE_THREADS: 'DISLIKE_THREADS'
}

function likeThreadCreator (likeThread) {
  return {
    type: ActionType.LIKE_THREADS,
    payload: {
      likeThread
    }
  }
}

function dislikeThreadCreator (dislikeThread) {
  return {
    type: ActionType.DISLIKE_THREADS,
    payload: {
      dislikeThread
    }
  }
}

function asyncLikeThread ({ threadId }) {
  return async (dispatch) => {
    try {
      const { error, data } = await api.upVote(threadId)
      if (!error) {
        dispatch(likeThreadCreator(data))
      } else {
        console.error('Error fetching threads:', error)
      }
    } catch (error) {
      alert(error.message)
    }
  }
}

function asyncDislikeThread ({ threadId }) {
  return async (dispatch) => {
    try {
      const { error, data } = await api.downVote(threadId)
      if (!error) {
        dispatch(dislikeThreadCreator(data))
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
  asyncLikeThread,
  likeThreadCreator,
  dislikeThreadCreator,
  asyncDislikeThread
}
