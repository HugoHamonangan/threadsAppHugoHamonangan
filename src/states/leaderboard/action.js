import api from '../../utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const ActionType = {
  SHOW_LEADERBOARD: 'SHOW_LEADERBOARD'
}

function showLeaderboardCreator (leaderboard) {
  return {
    type: ActionType.SHOW_LEADERBOARD,
    payload: leaderboard
  }
}

function asyncShowLeaderboard () {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const { error, data } = await api.getLeaderboard()
      if (!error) {
        dispatch(showLeaderboardCreator(data))
      } else {
        console.error('Error fetching leaderboard:', error)
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    }

    dispatch(hideLoading())
  }
}
export { ActionType, showLeaderboardCreator, asyncShowLeaderboard }
