import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Movie from '../interfaces/Movie';

export const loadMovies = createAsyncThunk('movies/loadMovies', async () => {
	try {
		const response = await axios.get('http://localhost:3000/movies');
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.log(error.message);
		} else {
			throw error;
		}
	}
});

const movieSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: [],
		filteredMovies: [],
		loading: false,
		error: false,
	},
	reducers: {
		searchMovies: (state, action) => {
			const query = action.payload.toLowerCase();
			if (query.length === 0) {
				state.filteredMovies = [];
				return;
			}
			state.filteredMovies = state.movies.filter((movie: Movie) => {
				return movie.title.toLowerCase().includes(query);
			});
		},
		sortMovies: (state, action) => {
			const query = action.payload;
			const sortedMovies = [...state.movies];
			const sortedFilteredMovies = [...state.filteredMovies];
			if (sortedFilteredMovies.length > 0) {
				if (query === 'title') {
					sortedFilteredMovies.sort((a: Movie, b: Movie) =>
						a.title
							.replace(/^The\s+/i, '')
							.localeCompare(b.title.replace(/^The\s+/i, ''))
					);
				} else if (query === 'year') {
					sortedFilteredMovies.sort(
						(a: Movie, b: Movie) => +b.release_date - +a.release_date
					);
				} else {
					sortedFilteredMovies.sort(
						(a: Movie, b: Movie) => b.rating - a.rating
					);
				}

				state.filteredMovies = sortedFilteredMovies;
			}

			if (query === 'title') {
				sortedMovies.sort((a: Movie, b: Movie) =>
					a.title
						.replace(/^The\s+/i, '')
						.localeCompare(b.title.replace(/^The\s+/i, ''))
				);
			} else if (query === 'year') {
				sortedMovies.sort(
					(a: Movie, b: Movie) => +b.release_date - +a.release_date
				);
			} else {
				sortedMovies.sort((a: Movie, b: Movie) => b.rating - a.rating);
			}

			state.movies = sortedMovies;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(loadMovies.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadMovies.fulfilled, (state, action) => {
				state.loading = false;
				state.movies = action.payload;
			})
			.addCase(loadMovies.rejected, (state) => {
				state.loading = false;
				state.error = true;
			}),
});

export const { searchMovies, sortMovies } = movieSlice.actions;
export default movieSlice.reducer;
