import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "../features/users/userSlice"
import teamReducer from "../features/teams/teamSlice"
import authReducer from "../auth/authSlice"

export const store = configureStore({
  reducer: {
    users: usersReducer,
    team: teamReducer,
    auth:authReducer
  },
});