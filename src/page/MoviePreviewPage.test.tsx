import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { generatePath } from 'react-router-dom';
import { MoviePreviewPage } from './MoviePreviewPage';
import { renderWithProviders, wrapWithRouter } from '../utils/testUtils';
import { routes } from '../routes';
import { formatDate } from '../utils/dateUtils';

test('it should render movie preview with not found message', async () => {
	renderWithProviders(
		wrapWithRouter(
			<MoviePreviewPage />,
			generatePath(routes.moviePreview, { movieId: 'non_existing_id' }),
			routes.moviePreview,
		),
	);

	expect(screen.getByText(/The requested resource is not found/i)).toBeInTheDocument();
});

test('it should render movie preview with movie details', async () => {
	renderWithProviders(
		wrapWithRouter(
			<MoviePreviewPage />,
			generatePath(routes.moviePreview, { movieId: '1' }),
			routes.moviePreview,
		),
	);

	await waitFor(() => {
		expect(screen.getByText(/Test title/i)).toBeInTheDocument();
		expect(screen.getByText(/Test overview/i)).toBeInTheDocument();
		const image = screen.getByAltText(/Test title/i);
		expect(image).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w342/test/poster.jpg');

		expect(screen.getByText(formatDate('2022-7-12'))).toBeInTheDocument();
		expect(screen.getByText(/Fantasy/i)).toBeInTheDocument();
		expect(screen.getByText(/Action/i)).toBeInTheDocument();
		expect(screen.getByText(/Drama/i)).toBeInTheDocument();
	});
});

test('it should render movie preview with an error message', async () => {
	renderWithProviders(
		wrapWithRouter(
			<MoviePreviewPage />,
			generatePath(routes.moviePreview, { movieId: '1234' }),
			routes.moviePreview,
		),
	);

	await waitFor(() => {
		expect(
			screen.getByText(/Something went wrong. Try refreshing the page or come back later./i),
		).toBeInTheDocument();
	});
});

