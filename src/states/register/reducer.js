import { ActionType } from './action'

function registerReducer (register = null, action) {
  switch (action.type) {
    case ActionType.REGISTER:
      return {
        ...action.payload
      }
    default:
      return register
  }
}

export default registerReducer
