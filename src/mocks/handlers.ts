import { rest } from 'msw';
import { StatusCodes } from 'http-status-codes';
import {
	ConfigurationResponse,
	GenreResponse,
	MovieDetailResponse,
	MovieResponse,
	Pageable,
} from '../model';

const confMock: ConfigurationResponse = {
	images: {
		baseUrl: 'http://image.tmdb.org/t/p/',
		secureBaseUrl: 'https://image.tmdb.org/t/p/',
		backdropSizes: ['w300', 'w780', 'w1280', 'original'],
		posterSizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
	},
};

const genresMocks: GenreResponse[] = [
	{
		id: 1,
		name: 'Fantasy',
	},
	{
		id: 2,
		name: 'Action',
	},
	{
		id: 3,
		name: 'Drama',
	},
];

const moviesMocks: Pageable<MovieResponse> = {
	page: 1,
	results: [
		{
			id: 1,
			genreIds: [1, 2],
			overview: 'Black Adam overview',
			posterPath: '/test/blackAdamPoster.jpg',
			backdropPath: '/test/blackAdamBackdrop.jpg',
			releaseDate: '2022-12-12',
			title: 'Black Adam',
		},
		{
			id: 2,
			genreIds: [3],
			overview: 'Fall overview',
			posterPath: '/test/fallPoster.jpg',
			backdropPath: '/test/fallBackdrop.jpg',
			releaseDate: '2022-7-12',
			title: 'Fall',
		},
	],
	totalPages: 1,
	totalResults: 2,
};

const movieDetailMock: MovieDetailResponse = {
	id: 1,
	genres: genresMocks,
	overview: 'Test overview',
	posterPath: '/test/poster.jpg',
	releaseDate: '2022-7-12',
	title: 'Test title',
};

export const handlers = [
	rest.get('*/genre/movie/list', (_, res, ctx) => {
		return res(
			ctx.status(StatusCodes.OK),
			ctx.json({
				genres: genresMocks,
			}),
		);
	}),
	rest.get('*/movie/upcoming', (req, res, ctx) => {
		const page = req.url.searchParams.get('page');

		if (page === '100') {
			return res(
				ctx.status(StatusCodes.OK),
				ctx.json({
					page: 100,
					results: [],
					totalPages: 1,
					totalResults: 0,
				}),
			);
		}

		if (page === '1') {
			return res(ctx.status(StatusCodes.OK), ctx.json(moviesMocks));
		}

		return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR));
	}),
	rest.get('*/search/movie', (req, res, ctx) => {
		const query = req.url.searchParams.get('query');

		if (query === 'adam') {
			return res(
				ctx.status(StatusCodes.OK),
				ctx.json({
					page: 1,
					results: [
						{
							id: 1,
							genreIds: [1, 2],
							overview: 'Black Adam overview',
							posterPath: '/test/blackAdamPoster.jpg',
							backdropPath: '/test/blackAdamBackdrop.jpg',
							releaseDate: '2022-12-12',
							title: 'Black Adam',
						},
					],
					totalPages: 1,
					totalResults: 1,
				}),
			);
		}

		return res(
			ctx.status(StatusCodes.OK),
			ctx.json({
				page: 1,
				results: [],
				totalPages: 1,
				totalResults: 0,
			}),
		);
	}),
	rest.get('*/movie/:movieId', (req, res, ctx) => {
		const movieId = req.params.movieId as string;

		if (movieId == movieDetailMock.id.toString()) {
			return res(ctx.status(StatusCodes.OK), ctx.json(movieDetailMock));
		}

		if (movieId === '1234') {
			return res(ctx.status(StatusCodes.INTERNAL_SERVER_ERROR));
		}

		return res(ctx.status(StatusCodes.NOT_FOUND), ctx.json(movieDetailMock));
	}),
	rest.get('*/configuration', (_, res, ctx) => {
		return res(ctx.status(StatusCodes.OK), ctx.json(confMock));
	}),
];

