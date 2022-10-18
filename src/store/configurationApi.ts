import { createApi } from '@reduxjs/toolkit/query/react';
import { ConfigurationResponse, ImagesConfiguration } from '../model';
import { axiosBaseQuery } from '../service';

export interface ApplicationImagesConfiguration extends ImagesConfiguration {
	preferredPosterSize: string;
	preferredBackdropSize: string;
}

export interface ApplicationConfiguration extends ConfigurationResponse {
	images: ApplicationImagesConfiguration;
}

export const configurationApi = createApi({
	reducerPath: 'configurationApi',
	tagTypes: ['Conf'],
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		getConfiguration: builder.query<ApplicationConfiguration, void>({
			keepUnusedDataFor: 5 * 60,
			providesTags: ['Conf'],
			query: () => ({
				url: '/configuration',
				method: 'get',
			}),
			transformResponse: (response: ConfigurationResponse) => ({
				...response,
				images: {
					...response.images,
					preferredPosterSize: 'w342',
					preferredBackdropSize: 'w300',
				},
			}),
		}),
	}),
});

export const { useGetConfigurationQuery } = configurationApi;

