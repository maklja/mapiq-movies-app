import * as React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { MovieCard } from './MovieCard';
import { renderWithProviders } from '../utils/testUtils';
import { formatDate } from '../utils/dateUtils';

test('it should render movie card with movie details', async () => {
	renderWithProviders(
		<MovieCard
			id={1}
			releaseDate="2022-6-12"
			title="Black Adam"
			genres={[
				{
					id: 1,
					name: 'Action',
				},
			]}
			posterPath="/test/blackAdamPoster.jpg"
		/>,
	);

	await waitFor(() => {
		expect(screen.getByText(/Black Adam/i)).toBeInTheDocument();
		expect(screen.getByText(formatDate('2022-6-12'))).toBeInTheDocument();
		expect(screen.getByText(/Action/i)).toBeInTheDocument();
		const blackAdamPoster = screen.getByAltText(/Black Adam/i);
		expect(blackAdamPoster).toHaveAttribute(
			'src',
			'https://image.tmdb.org/t/p/w342/test/blackAdamPoster.jpg',
		);
	});
});
