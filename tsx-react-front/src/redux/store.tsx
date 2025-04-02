import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		movies: movieReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
