import Container from '@mui/material/Container';
import { NotFoundMessageDialog } from '../components';

export const NotFoundPage = () => {
	return (
		<Container maxWidth="lg">
			<NotFoundMessageDialog />
		</Container>
	);
};
