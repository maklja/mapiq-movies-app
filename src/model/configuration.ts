export interface ImagesConfiguration {
	baseUrl: string;
	secureBaseUrl: string;
	posterSizes: string[];
	backdropSizes: string[];
}

export interface ConfigurationResponse {
	images: ImagesConfiguration;
}

