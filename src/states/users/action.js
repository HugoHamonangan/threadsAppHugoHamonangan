import api from '../../utils/api'

const ActionType = {
  SHOW_ALL_USERS: 'SHOW_ALL_USERS'
}

function showAllUsersCreator (users) {
  return {
    type: ActionType.SHOW_ALL_USERS,
    payload: users
  }
}

function asyncShowAllUsers () {
  return async (dispatch) => {
    try {
      const { error, data } = await api.getUsers()
      if (!error) {
        dispatch(showAllUsersCreator(data))
      }
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  ActionType,
  showAllUsersCreator,
  asyncShowAllUsers
}
