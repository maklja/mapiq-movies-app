import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { MovieDetailResponse, MovieResponse } from '../model';
import type { RootState } from './appStore';
import { selectGenres } from './genresSlice';
import { movieApi } from './movieApi';

const moviesAdapter = createEntityAdapter<MovieResponse>({
	selectId: (movie) => movie.id,
});

const movieSlice = createSlice({
	name: 'movies',
	initialState: moviesAdapter.getInitialState(),
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(movieApi.endpoints.getUpcomingMovies.matchFulfilled, (state, action) => {
			moviesAdapter.setMany(state, action.payload.results);
		});
	},
});

const extendedApi = movieApi.injectEndpoints({
	endpoints: (builder) => ({
		getMovieDetailById: builder.query<MovieDetailResponse, number>({
			async queryFn(movieId, api, _, baseQuery) {
				const state = api.getState() as RootState;
				const movie = selectMovieById(state, movieId);
				const genres = selectGenres(state);
				const movieGenres = genres.filter((genre) => movie?.genreIds.includes(genre.id));

				if (!movie || movieGenres.length != movie?.genreIds.length) {
					return baseQuery({
						url: `/movie/${movieId}`,
						method: 'get',
					});
				}

				return {
					data: {
						id: movie.id,
						overview: movie.overview,
						posterPath: movie.posterPath,
						releaseDate: movie.releaseDate,
						title: movie.title,
						genres: movieGenres,
					},
				};
			},
		}),
	}),
});

export default movieSlice.reducer;

export const { selectById: selectMovieById, selectAll: selectMovies } =
	moviesAdapter.getSelectors<RootState>((state) => state.movies);

export const { useGetMovieDetailByIdQuery } = extendedApi;

