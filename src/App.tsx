import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MoviePreviewPage, NotFoundPage, UpcomingMoviePage } from './page';
import { routes } from './routes';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={routes.moviePreview} element={<MoviePreviewPage />} />
				<Route path={routes.movies} element={<UpcomingMoviePage />} />
				<Route path={routes.home} element={<UpcomingMoviePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
