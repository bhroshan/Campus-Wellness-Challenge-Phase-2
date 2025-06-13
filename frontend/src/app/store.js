import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import challengeReducer from '../features/challenges/challengeSlice';
import dashboardReducer from '../features/challenges/dashboardSlice';
import enrollReducer from '../features/challenges/enrollSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challenges: challengeReducer,
    dashboard: dashboardReducer,
    enroll: enrollReducer,
  },
});
