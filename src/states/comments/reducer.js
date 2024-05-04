import { ActionType } from './action'

function addCommentsReducer (comments = [], action) {
  switch (action.type) {
    case ActionType.ADD_COMMENTS:
      return action.payload
    default:
      return comments
  }
}

export default addCommentsReducer
