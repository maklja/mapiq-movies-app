import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { UpcomingMoviePage } from './UpcomingMoviePage';
import { renderWithProviders, wrapWithRouter } from '../utils/testUtils';
import { routes } from '../routes';

test('it should render upcoming movies page with empty results', async () => {
	renderWithProviders(
		wrapWithRouter(<UpcomingMoviePage />, `${routes.movies}?page=100`, routes.movies),
	);

	expect(screen.getByRole(/progressbar/i)).toBeInTheDocument();

	await waitFor(() => {
		expect(screen.getByText(/No results found/i)).toBeInTheDocument();
	});
});

test('it should render upcoming movies page with movies tiles', async () => {
	renderWithProviders(
		wrapWithRouter(<UpcomingMoviePage />, `${routes.movies}?page=1`, routes.movies),
	);

	await waitFor(() => {
		expect(screen.getByRole(/progressbar/i)).toBeInTheDocument();
	});

	await waitFor(() => {
		expect(screen.getByText(/Black Adam/i)).toBeInTheDocument();
		const blackAdamPoster = screen.getByAltText(/Black Adam/i);
		expect(blackAdamPoster).toHaveAttribute(
			'src',
			'https://image.tmdb.org/t/p/w342/test/blackAdamPoster.jpg',
		);

		expect(screen.getByText(/Fall/i)).toBeInTheDocument();
		const fallPoster = screen.getByAltText(/Fall/i);
		expect(fallPoster).toHaveAttribute(
			'src',
			'https://image.tmdb.org/t/p/w342/test/fallPoster.jpg',
		);
	});
});

test('it should render upcoming movies with search results', async () => {
	renderWithProviders(
		wrapWithRouter(<UpcomingMoviePage />, `${routes.movies}?query=adam`, routes.movies),
	);

	await waitFor(() => {
		expect(screen.getByRole(/progressbar/i)).toBeInTheDocument();
	});

	await waitFor(() => {
		expect(screen.getByText(/Black Adam/i)).toBeInTheDocument();
		const blackAdamPoster = screen.getByAltText(/Black Adam/i);
		expect(blackAdamPoster).toHaveAttribute(
			'src',
			'https://image.tmdb.org/t/p/w342/test/blackAdamPoster.jpg',
		);
	});
});

