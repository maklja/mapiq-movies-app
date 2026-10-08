import * as React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { MovieSearchComponent } from './MovieSearchComponent';

test('it should set initial input value', async () => {
	render(<MovieSearchComponent value="Black Adam" />);

	expect(screen.getByDisplayValue(/Black Adam/i)).toBeInTheDocument();
});

test('it should change value on input and trigger onChange event', (done) => {
	const input = render(
		<MovieSearchComponent
			onChange={(searchQuery) => {
				expect(searchQuery).toBe('Black Adam');
				done();
			}}
		/>,
	).getByPlaceholderText('Search movie') as HTMLInputElement;
	fireEvent.change(input, { target: { value: 'Black Adam' } });
	expect(input.value).toBe('Black Adam');
});
