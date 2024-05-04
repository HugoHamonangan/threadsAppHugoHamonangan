import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  ADD_COMMENTS: 'ADD_COMMENTS',
};

function addCommentsCreator(comments) {
  return {
    type: ActionType.ADD_COMMENTS,
    payload: comments,
  };
}

function asyncAddComments(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const data = await api.createComment(threadId, content);
      dispatch(addCommentsCreator(data));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, addCommentsCreator, asyncAddComments };
