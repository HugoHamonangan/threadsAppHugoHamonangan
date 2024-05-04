import { ActionType } from './action'

function showAllUsersReducer (users = [], action) {
  switch (action.type) {
    case ActionType.SHOW_ALL_USERS:
      return action.payload
    default:
      return users
  }
}

export default showAllUsersReducer
