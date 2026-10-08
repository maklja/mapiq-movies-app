import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { StatusCodes } from 'http-status-codes';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ErrorIcon from '@mui/icons-material/Error';
import { RequestError } from '../service';

export interface DialogMessageProps {
	message: string;
	error?: boolean;
	icon?: JSX.Element;
}

export const DialogMessage = (props: DialogMessageProps) => {
	return (
		<Stack m={4} alignItems="center">
			<Paper>
				<Stack direction="row" alignItems="center" justifyItems="center" mx={2}>
					{props.icon ? props.icon : null}
					<Box m={4}>
						<Typography
							gutterBottom
							variant="h6"
							component="div"
							color={props.error ? 'red' : 'black'}
						>
							{props.message}
						</Typography>
					</Box>
				</Stack>
			</Paper>
		</Stack>
	);
};

export const NotFoundMessageDialog = () => (
	<DialogMessage message="The requested resource is not found." />
);

export const ErrorMessageDialog = () => (
	<DialogMessage
		message="Something went wrong. Try refreshing the page or come back later."
		error
		icon={
			<Avatar sx={{ bgcolor: 'red' }}>
				<ErrorIcon />
			</Avatar>
		}
	/>
);

export const UnauthorizedMessageDialog = () => (
	<DialogMessage
		message="Invalid API key, access denied."
		error
		icon={
			<Avatar sx={{ bgcolor: 'red' }}>
				<DoDisturbIcon />
			</Avatar>
		}
	/>
);

export const createMessageDialog = (error: RequestError) => {
	if (error.status === StatusCodes.NOT_FOUND) {
		return <NotFoundMessageDialog />;
	}

	if (error.status === StatusCodes.UNAUTHORIZED) {
		return <UnauthorizedMessageDialog />;
	}

	return <ErrorMessageDialog />;
};

