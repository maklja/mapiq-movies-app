import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export interface GenreChipProps {
	label: string;
	loading?: boolean;
}

export const GenreChip = (props: GenreChipProps) => {
	return (
		<Box py={0.3}>
			{props.loading ? (
				<Skeleton variant="rounded" width={60} height={20} />
			) : (
				<Chip
					label={
						<Typography component="span" variant="caption">
							{props.label}
						</Typography>
					}
					size="small"
				/>
			)}
		</Box>
	);
};

