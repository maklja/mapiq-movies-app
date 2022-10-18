import React, { PropsWithChildren } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AppStore, RootState, setupStore } from '../store/appStore';

const theme = createTheme({});

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {},
) {
	function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
		return (
			<Provider store={store}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</Provider>
		);
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function wrapWithRouter(
	ui: React.ReactElement,
	initialRoute: string,
	routePath: string,
): JSX.Element {
	return (
		<MemoryRouter initialEntries={[initialRoute]}>
			<Routes>
				<Route path={routePath} element={ui} />
			</Routes>
		</MemoryRouter>
	);
}

