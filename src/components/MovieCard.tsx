import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { useGetConfigurationQuery } from '../store/configurationApi';
import { generateTileImageUrl } from '../utils/imageUtils';
import { GenreResponse } from '../model';
import { formatDate } from '../utils/dateUtils';
import { GenreChip } from './GenreChip';

export interface MovieCardProps {
	id: number;
	title: string;
	releaseDate: string;
	posterPath?: string | null;
	backdropPath?: string | null;
	genres: (GenreResponse | null)[];
	genresLoading?: boolean;
	onClick?: (id: number) => void;
}

export const MovieCard = (props: MovieCardProps) => {
	const { data: appConfig = null } = useGetConfigurationQuery();

	const imageUrl = generateTileImageUrl(appConfig, {
		posterPath: props.posterPath,
		backdropPath: props.backdropPath,
	});

	const handleClick = () => props.onClick?.(props.id);

	return (
		<Card sx={{ minWidth: '100%', minHeight: '100%' }}>
			<CardHeader
				sx={{
					display: 'block',
					overflow: 'hidden',
				}}
				title={props.title}
				titleTypographyProps={{
					variant: 'body1',
					noWrap: true,
					textOverflow: 'ellipsis',
					maxWidth: { sm: '240px', xs: '350px' },
				}}
				subheader={formatDate(props.releaseDate)}
				subheaderTypographyProps={{ variant: 'body2' }}
			/>
			<CardActionArea onClick={handleClick}>
				<CardMedia
					title={props.title}
					component="img"
					height="342"
					image={imageUrl}
					alt={props.title}
					itemProp="movie-card"
				/>
				<CardContent>
					<Stack direction="row" spacing={0.3} flexWrap="wrap">
						{props.genres.map((genre, index) => (
							<GenreChip
								key={genre?.id ?? index}
								label={genre?.name ?? 'unknown'}
								loading={props.genresLoading}
							/>
						))}
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

