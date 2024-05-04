// reducer.js
import { ActionType } from './action'

function showOwnProfileReducer (ownProfile = {}, action) {
  switch (action.type) {
    case ActionType.SHOW_OWNPROFILE:
      return action.payload
    default:
      return ownProfile
  }
}

export default showOwnProfileReducer
