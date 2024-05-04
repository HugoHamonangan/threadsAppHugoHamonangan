// action.js
import api from '../../utils/api'

const ActionType = {
  SHOW_OWNPROFILE: 'SHOW_OWNPROFILE'
}

function showOwnProfileCreator (user) {
  return {
    type: ActionType.SHOW_OWNPROFILE,
    payload: user
  }
}

function asyncShowOwnProfile () {
  return async (dispatch) => {
    try {
      const { error, data } = await api.getOwnProfile()
      if (!error) {
        dispatch(showOwnProfileCreator(data))
      } else {
        console.error('Error fetching profile:', error)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
}

export {
  ActionType,
  showOwnProfileCreator,
  asyncShowOwnProfile
}
