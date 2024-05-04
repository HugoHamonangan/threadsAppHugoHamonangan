import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import addThreadsReducer from './reducer';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { addThreadCreator, asyncAddThread } from './action';

describe('leaderboardReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = addThreadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads create when given ADD_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'ADD_THREADS',
      payload: {
        thread: {
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          downVotesBy: [],
          id: 'thread-1',
          ownerId: 'users-1',
          title: 'Thread Pertama',
          totalComments: 0,
          upVotesBy: [],
        },
      },
    };

    const nextState = addThreadsReducer(initialState, action);

    expect(nextState.thread).toEqual(action.payload.thread);
  });
});

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

describe('asyncAddThreads thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    delete api._createThread;
  });

  it('should dispatch action thread correctly when data fetching success', async () => {
    api.createThread = () => Promise.resolve(fakeThreadsResponse);

    const dispatch = vi.fn();

    await asyncAddThread({
      title: 'Thread Title',
      body: 'Thread Body',
      category: 'Thread Category',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addThreadCreator(fakeThreadsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
