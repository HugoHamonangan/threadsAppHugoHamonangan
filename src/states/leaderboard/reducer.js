// reducer.js
import { ActionType } from './action'

const initialState = []

function leaderboardReducer (leaderboard = initialState, action) {
  switch (action.type) {
    case ActionType.SHOW_LEADERBOARD:
      return action.payload !== undefined ? action.payload : leaderboard
    default:
      return leaderboard
  }
}

export default leaderboardReducer
