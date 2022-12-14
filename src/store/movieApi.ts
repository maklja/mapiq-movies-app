import { createApi } from '@reduxjs/toolkit/query/react';
import { MovieDetailResponse, MovieResponse, Pageable } from '../model';
import { axiosBaseQuery } from '../service';

export const movieApi = createApi({
	reducerPath: 'movieApis',
	tagTypes: ['Movies'],
	baseQuery: axiosBaseQuery<MovieDetailResponse>(),
	keepUnusedDataFor: 60,
	endpoints: (builder) => ({
		getUpcomingMovies: builder.query<Pageable<MovieResponse>, { page?: number } | void>({
			providesTags: ['Movies'],
			query: ({ page } = { page: 1 }) => ({
				url: '/movie/upcoming',
				method: 'get',
				params: {
					page,
				},
			}),
		}),
		searchMovies: builder.query<Pageable<MovieResponse>, { query: string; page?: number }>({
			keepUnusedDataFor: 60,
			providesTags: ['Movies'],
			query: ({ query, page }) => ({
				url: '/search/movie',
				method: 'get',
				params: {
					query,
					page: page ?? 1,
				},
			}),
		}),
	}),
});

export const { useGetUpcomingMoviesQuery, useSearchMoviesQuery } = movieApi;

