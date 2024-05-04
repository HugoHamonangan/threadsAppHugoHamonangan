import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  ADD_THREADS: 'ADD_THREADS',
};

function addThreadCreator(threads) {
  return {
    type: ActionType.ADD_THREADS,
    payload: threads,
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const data = await api.createThread({ title, body, category });
      dispatch(addThreadCreator(data));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, addThreadCreator, asyncAddThread };
