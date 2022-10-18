import { useDispatch } from 'react-redux';
import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { genreApi } from './genresApi';
import { movieApi } from './movieApi';
import { configurationApi } from './configurationApi';

const rootReducer = combineReducers({
	[configurationApi.reducerPath]: configurationApi.reducer,
	[genreApi.reducerPath]: genreApi.reducer,
	[movieApi.reducerPath]: movieApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	const store = configureStore({
		preloadedState,
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(movieApi.middleware)
				.concat(genreApi.middleware)
				.concat(configurationApi.middleware),
	});
	setupListeners(store.dispatch);

	return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;

