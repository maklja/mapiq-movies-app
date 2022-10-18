import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useGetUpcomingMoviesQuery, useSearchMoviesQuery } from '../store/movieApi';
import { ChangeEvent, useState } from 'react';
import { useNavigate, useSearchParams, generatePath } from 'react-router-dom';
import { routes } from '../routes';
import { useGetMovieGenresQuery } from '../store/genresApi';
import { MovieCard, MovieSearchComponent, createMessageDialog } from '../components';
import { RequestError } from '../service';
import { GenreResponse, MovieResponse, Pageable } from '../model';

const LoadingSpinner = () => {
	return (
		<Stack alignItems="center" justifyContent="center" m={4} minHeight={400}>
			<CircularProgress
				size={60}
				role="progressbar"
				aria-label="loading movies"
				aria-valuetext="Loading..."
			/>
		</Stack>
	);
};

const NoResultsMessage = () => {
	return (
		<Stack alignItems="center" justifyContent="center" width="100%" minHeight={400}>
			<Typography component="div" variant="h5">
				No results found
			</Typography>
		</Stack>
	);
};

const PAGE_QUERY_PARAM = 'page';
const SEARCH_QUERY_PARAM = 'query';

export interface MoviePaginationProps {
	loading: boolean;
	movies?: Pageable<MovieResponse>;
	uninitialized: boolean;
	fetching: boolean;
	page: number;
	search: string;
	genres?: GenreResponse[];
	genresLoading?: boolean;
	onPageIndexChange?: (page: number) => void;
	onSearchChange?: (search: string) => void;
}

export const MoviePagination = (props: MoviePaginationProps) => {
	const navigate = useNavigate();
	const handleMovieCardClick = (movieId: number) => {
		navigate(generatePath(routes.moviePreview, { movieId }));
	};

	return (
		<Stack alignItems="center" spacing={4} my={1}>
			{props.loading || props.uninitialized ? (
				<LoadingSpinner />
			) : (
				<>
					<Grid container spacing={2} alignItems="top" width="100%">
						{props.movies && props.movies.results.length > 0 ? (
							props.movies.results.map((movie) => (
								<Grid key={movie.id} xs={12} sm={6} md={3}>
									<MovieCard
										id={movie.id}
										title={movie.title}
										genres={movie.genreIds.map(
											(genreId) =>
												props.genres?.find(
													(curGenre) => curGenre.id === genreId,
												) ?? null,
										)}
										genresLoading={props.genresLoading}
										posterPath={movie.posterPath}
										backdropPath={movie.backdropPath}
										releaseDate={movie.releaseDate}
										onClick={handleMovieCardClick}
									/>
								</Grid>
							))
						) : (
							<NoResultsMessage />
						)}
					</Grid>
					<Box sx={{ width: '100%', mb: 2 }}>
						{props.fetching ? <LinearProgress /> : null}
					</Box>
					<Pagination
						count={props.movies?.totalPages}
						page={props.page}
						color="primary"
						size="large"
						datatype="movie-pagination"
						onChange={(_: ChangeEvent<unknown>, pageIndex: number) =>
							props.onPageIndexChange?.(pageIndex)
						}
					/>
				</>
			)}
		</Stack>
	);
};

export interface SearchMoviesProps {
	page: number;
	search: string;
	onPageIndexChange?: (page: number) => void;
	onSearchChange?: (search: string) => void;
}

export const SearchMovies = (props: SearchMoviesProps) => {
	const {
		isLoading,
		data: movies,
		isUninitialized,
		isFetching,
		isError,
		error,
	} = useSearchMoviesQuery({ query: props.search, page: props.page });
	const { data: genres, isLoading: genresLoading } = useGetMovieGenresQuery();

	if (isError) {
		return createMessageDialog(error as RequestError);
	}

	return (
		<MoviePagination
			fetching={isFetching}
			loading={isLoading}
			movies={movies}
			uninitialized={isUninitialized}
			page={props.page}
			search={props.search}
			onPageIndexChange={props.onPageIndexChange}
			onSearchChange={props.onSearchChange}
			genres={genres}
			genresLoading={genresLoading}
		/>
	);
};

export interface UpcomingMoviesProps {
	page: number;
	onPageIndexChange?: (page: number) => void;
	onSearchChange?: (search: string) => void;
}

export const UpcomingMovies = (props: UpcomingMoviesProps) => {
	const {
		isLoading,
		data: movies,
		isUninitialized,
		isFetching,
		isError,
		error,
	} = useGetUpcomingMoviesQuery({ page: props.page });
	const { data: genres, isLoading: genresLoading } = useGetMovieGenresQuery();

	if (isError) {
		return createMessageDialog(error as RequestError);
	}

	return (
		<MoviePagination
			fetching={isFetching}
			loading={isLoading}
			movies={movies}
			uninitialized={isUninitialized}
			page={props.page}
			search={''}
			onPageIndexChange={props.onPageIndexChange}
			onSearchChange={props.onSearchChange}
			genres={genres}
			genresLoading={genresLoading}
		/>
	);
};

export const UpcomingMoviePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get(PAGE_QUERY_PARAM);
	const queryParamPage = parseInt(page ?? '1') ?? 1;
	const queryParamSearch = searchParams.get(SEARCH_QUERY_PARAM) ?? '';

	const [currentPage, setCurrentPage] = useState(queryParamPage);
	const [search, setSearch] = useState(queryParamSearch);

	const handlePageChange = (pageIndex: number) => {
		setCurrentPage(pageIndex);
		setSearchParams({
			[PAGE_QUERY_PARAM]: pageIndex.toString(),
			[SEARCH_QUERY_PARAM]: search,
		});
	};

	const handleMovieSearch = (searchQuery: string) => {
		setSearch(searchQuery);
		setCurrentPage(1);
		setSearchParams({
			[SEARCH_QUERY_PARAM]: searchQuery,
			[PAGE_QUERY_PARAM]: '1',
		});
	};

	return (
		<Container maxWidth="lg">
			<Stack alignItems="center" py={1}>
				<MovieSearchComponent value={search} onChange={handleMovieSearch} />
			</Stack>

			{search.length > 0 ? (
				<SearchMovies
					page={currentPage}
					search={search}
					onPageIndexChange={handlePageChange}
					onSearchChange={handleMovieSearch}
				/>
			) : (
				<UpcomingMovies
					page={currentPage}
					onPageIndexChange={handlePageChange}
					onSearchChange={handleMovieSearch}
				/>
			)}
		</Container>
	);
};

