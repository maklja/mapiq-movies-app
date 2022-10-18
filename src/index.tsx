import ReactDOM from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setupStore } from './store/appStore';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={setupStore()}>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
console.log(`Environment ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'production') {
	serviceWorkerRegistration.register();
} else {
	serviceWorkerRegistration.unregister();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

