import * as React from 'react';
import { screen, render } from '@testing-library/react';
import { GenreChip } from './GenreChip';

test('it should render genre chip with genre details', async () => {
	render(<GenreChip label="Action" />);

	expect(screen.getByText(/Action/i)).toBeInTheDocument();
});
