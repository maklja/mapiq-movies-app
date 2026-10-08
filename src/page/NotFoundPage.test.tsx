import * as React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

test('it should render page with not found message', async () => {
	render(<NotFoundPage />);

	expect(screen.getByText(/The requested resource is not found./i)).toBeInTheDocument();
});
