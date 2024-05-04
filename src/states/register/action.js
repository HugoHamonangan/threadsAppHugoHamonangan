import api from '../../utils/api'

const ActionType = {
  REGISTER: 'REGISTER'
}

function register (payload) {
  return {
    type: ActionType.REGISTER,
    payload
  }
}

function asyncRegister (name, email, password) {
  return async (dispatch) => {
    try {
      const { data, error } = await api.register(name, email, password)
      if (!error) {
        dispatch(register(data))
      }
    } catch (error) {
      alert(error.message)
    }
  }
}

export {
  ActionType,
  register,
  asyncRegister
}
