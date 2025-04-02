import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import User from '../interfaces/User';

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (userCredentials: { name: string; password: string }) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/auth/login',
				userCredentials
			);
			if (response.status === 200) {
				return response.data;
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data);
				throw error;
			}
		}
	}
);
export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (userCredentials: { name: string; password: string }) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/auth/register',
				userCredentials
			);
			if (response.status === 200) {
				return response.data;
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data);
				throw error;
			}
		}
	}
);
export const addFavoriteMovie = createAsyncThunk(
	'user/addFavoriteMovie',
	async (user: { movieId: number; accessToken: string }) => {
		try {
			const response = await axios.patch(
				'http://localhost:3000/auth/favorites/add',
				{
					movieId: user.movieId,
				},
				{
					headers: {
						authorization: 'Bearer ' + user.accessToken,
					},
				}
			);
			if (response.status === 200) {
				return response.data;
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data);
				throw error;
			}
		}
	}
);
export const removeFavoriteMovie = createAsyncThunk(
	'user/removeFavoriteMovie',
	async (user: { movieId: number; accessToken: string }) => {
		try {
			const response = await axios.patch(
				'http://localhost:3000/auth/favorites/remove',
				{
					movieId: user.movieId,
				},
				{
					headers: {
						authorization: 'Bearer ' + user.accessToken,
					},
				}
			);
			if (response.status === 200) {
				return response.data;
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data);
				throw error;
			}
		}
	}
);

const initialState: {
	user: User | null;
	loading: boolean;
	error: boolean;
	errorMessage: string;
} = {
	user: JSON.parse(localStorage.getItem('user') || 'null'),
	loading: false,
	error: false,
	errorMessage: '',
};

const createSliceUser = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: (state) => {
			state.user = null;
			localStorage.removeItem('user');
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessage = '';
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.loading = false;
				state.user = action.payload;
				localStorage.setItem('user', JSON.stringify(action.payload));
			})
			.addCase(loginUser.rejected, (state) => {
				state.loading = false;
				state.error = true;
				state.errorMessage = 'Wrong password or username!';
			})
			.addCase(
				addFavoriteMovie.fulfilled,
				(state, action: PayloadAction<number[]>) => {
					if (state.user) {
						state.user.favoriteMovies = action.payload;
						localStorage.setItem('user', JSON.stringify(state.user));
					}
				}
			)
			.addCase(
				removeFavoriteMovie.fulfilled,
				(state, action: PayloadAction<number[]>) => {
					if (state.user) {
						state.user.favoriteMovies = action.payload;
						localStorage.setItem('user', JSON.stringify(state.user));
					}
				}
			),
});

export const { logoutUser } = createSliceUser.actions;
export default createSliceUser.reducer;
