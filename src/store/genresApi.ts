import { createApi } from '@reduxjs/toolkit/query/react';
import { GenreResponse } from '../model';
import { axiosBaseQuery } from '../service';

export const genreApi = createApi({
	reducerPath: 'genreApi',
	tagTypes: ['Genres'],
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		getMovieGenres: builder.query<GenreResponse[], void>({
			keepUnusedDataFor: 5 * 60,
			providesTags: ['Genres'],
			query: () => ({
				url: '/genre/movie/list',
				method: 'get',
			}),
			transformResponse: (response: { genres: GenreResponse[] }) => response.genres,
		}),
	}),
});

export const { useGetMovieGenresQuery } = genreApi;
