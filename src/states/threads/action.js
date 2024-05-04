import api from '../../utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionType = {
  SHOW_THREADS: 'SHOW_THREADS'
}

function showThreadCreator (threads) {
  return {
    type: ActionType.SHOW_THREADS,
    payload: threads
  }
}

function asyncShowThread () {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const { error, data } = await api.getThreads()
      if (!error) {
        dispatch(showThreadCreator(data))
      } else {
        console.error('Error fetching threads:', error)
      }
    } catch (error) {
      alert(error.message)
    }
    dispatch(hideLoading())
  }
}

export {
  ActionType,
  showThreadCreator,
  asyncShowThread
}
