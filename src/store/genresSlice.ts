import { createSlice } from '@reduxjs/toolkit';
import type { GenreResponse } from '../model';
import type { RootState } from './appStore';
import { genreApi } from './genresApi';

const initialState = {
	values: [],
} as { values: GenreResponse[] };

const slice = createSlice({
	name: 'genres',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(genreApi.endpoints.getMovieGenres.matchFulfilled, (state, action) => {
			state.values = action.payload;
		});
	},
});

export default slice.reducer;

export const selectGenres = (state: RootState) => state.genres.values;

