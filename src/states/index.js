import { configureStore } from '@reduxjs/toolkit'
import leaderboardReducer from './leaderboard/reducer'
import showThreadReducer from './threads/reducer'
import authUserReducer from './authUser/reducer'
import likeThreadReducer from './likeThreads/reducer'
import showOwnProfileReducer from './myOwnPtofile/reducer'
import showDetailThreadsReducer from './detailThreads/reducer'
import showAllUsersReducer from './users/reducer'
import addCommentsReducer from './comments/reducer'
import likeThreadCommentReducer from './likeThreadsComment/reducer'
import addThreadsReducer from './addThreads/reducer'
import registerReducer from './register/reducer'
import { loadingBarReducer } from 'react-redux-loading-bar'

const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
    showThreads: showThreadReducer,
    authUser: authUserReducer,
    register: registerReducer,
    likeThreads: likeThreadReducer,
    ownProfile: showOwnProfileReducer,
    detailThreads: showDetailThreadsReducer,
    showAllUsers: showAllUsersReducer,
    comments: addCommentsReducer,
    likeThreadsComment: likeThreadCommentReducer,
    addThreads: addThreadsReducer,
    loadingBar: loadingBarReducer
  }
})

export default store
