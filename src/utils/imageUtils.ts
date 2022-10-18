import { ApplicationConfiguration } from '../store/configurationApi';

const getPreferredPosterImageSize = (config: ApplicationConfiguration) => {
	const { posterSizes, preferredPosterSize } = config.images;

	if (posterSizes.includes(preferredPosterSize)) {
		return preferredPosterSize;
	}

	console.warn(
		`Preferred poster size ${preferredPosterSize} not found, fallback to original size`,
	);
	return posterSizes.at(-1);
};

const getPreferredBackdropImageSize = (config: ApplicationConfiguration) => {
	const { backdropSizes, preferredBackdropSize } = config.images;

	if (backdropSizes.includes(preferredBackdropSize)) {
		return preferredBackdropSize;
	}

	console.warn(
		`Preferred poster size ${preferredBackdropSize} not found, fallback to original size`,
	);
	return backdropSizes.at(-1);
};

export const generateTileImageUrl = (
	config: ApplicationConfiguration | null,
	imagePaths: {
		posterPath?: string | null;
		backdropPath?: string | null;
	},
) => {
	if (!config) {
		return '';
	}

	const { posterPath, backdropPath } = imagePaths;
	const imageUrlBase = config.images.secureBaseUrl;

	if (posterPath) {
		const preferredSize = getPreferredPosterImageSize(config);
		return `${imageUrlBase}${preferredSize}${posterPath}`;
	}

	if (backdropPath) {
		const preferredSize = getPreferredBackdropImageSize(config);
		return `${imageUrlBase}${preferredSize}${backdropPath}`;
	}

	return '/no_image.jpg';
};
