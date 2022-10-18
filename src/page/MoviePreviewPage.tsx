import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { useGetConfigurationQuery } from '../store/configurationApi';
import { useGetMovieDetailByIdQuery } from '../store/movieApi';
import { generateTileImageUrl } from '../utils/imageUtils';
import { GenreChip, createMessageDialog, NotFoundMessageDialog } from '../components';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Skeleton from '@mui/material/Skeleton';
import { Theme } from '@mui/material';
import { RequestError } from '../service';
import { formatDate } from '../utils/dateUtils';

export interface MoviePreviewPageContentProps {
	movieId: number;
}

export const MoviePreviewPageContent = (props: MoviePreviewPageContentProps) => {
	const largeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
	const { data, isLoading, error, isError } = useGetMovieDetailByIdQuery(props.movieId);
	const { data: appConfig = null } = useGetConfigurationQuery();
	const imageUrl = generateTileImageUrl(appConfig, {
		posterPath: data?.posterPath,
	});

	if (isError) {
		return createMessageDialog(error as RequestError);
	}

	return (
		<Container maxWidth="lg">
			<Stack
				spacing={3}
				mt={5}
				direction={largeScreen ? 'row' : 'column-reverse'}
				alignItems={largeScreen ? '' : 'center'}
			>
				<img src={imageUrl} width={342} alt={data?.title} />
				<Stack spacing={3} width="100%">
					<Stack alignItems={largeScreen ? '' : 'center'}>
						{isLoading ? (
							<>
								<Skeleton variant="rounded" height={50} />
								<Skeleton variant="text" width={100} />
							</>
						) : (
							<>
								<Typography component="h1" variant="h4" itemProp="main-header">
									{data?.title}
								</Typography>
								<Typography component="span" variant="caption">
									{data && formatDate(data.releaseDate)}
								</Typography>
								<Stack direction="row" spacing={1}>
									{data?.genres.map((genre) => (
										<GenreChip key={genre.id} label={genre.name} />
									))}
								</Stack>
							</>
						)}
					</Stack>
					<Box>
						{isLoading ? (
							<Skeleton variant="rounded" height={200} />
						) : (
							<Typography component="span" variant="body1">
								{data?.overview}
							</Typography>
						)}
					</Box>
				</Stack>
			</Stack>
		</Container>
	);
};

export const MoviePreviewPage = () => {
	const { movieId } = useParams();

	if (!movieId || isNaN(+movieId)) {
		return <NotFoundMessageDialog />;
	}

	return <MoviePreviewPageContent movieId={+movieId} />;
};

