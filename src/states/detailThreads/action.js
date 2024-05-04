import api from '../../utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionType = {
  SHOW_DETAIL_THREADS: 'SHOW_DETAIL_THREADS'
}

function showDetailThreadsCreator (threadsDetail) {
  return {
    type: ActionType.SHOW_DETAIL_THREADS,
    payload: threadsDetail
  }
}

function asyncShowDetailThreads ({ threadId }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const { error, data } = await api.getThreadDetail(threadId)
      if (!error) {
        dispatch(showDetailThreadsCreator(data))
      } else {
        console.log(error)
      }
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

export {
  ActionType,
  showDetailThreadsCreator,
  asyncShowDetailThreads
}
