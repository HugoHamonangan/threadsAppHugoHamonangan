import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import addCommentsReducer from './reducer';
import api from '../../utils/api';
import { addCommentsCreator, asyncAddComments } from './action';

describe('commentsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = addCommentsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the comments when given by ADD_COMMENTS action', () => {
    const initialState = [];
    const action = {
      type: 'ADD_COMMENTS',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    };

    const nextState = addCommentsReducer(initialState, action);

    expect(nextState.comment).toEqual(action.payload.comment);
  });
});

const fakeCommentsResponse = [
  {
    id: 'comment-1',
    content: 'Ini adalah komentar pertama',
    createdAt: '2021-06-21T07:00:00.000Z',
    upVotesBy: [],
    downVotesBy: [],
    owner: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
];

describe('asyncAddComments thunk', () => {
  beforeEach(() => {
    api._createComment = api.createComment;
  });

  afterEach(() => {
    api.createComment = api._createComment;

    delete api._createComment;
  });

  it('should dispatch action comments correctly when data fetching success', async () => {
    api.createComment = () => Promise.resolve(fakeCommentsResponse);

    const dispatch = vi.fn();

    await asyncAddComments()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addCommentsCreator(fakeCommentsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
