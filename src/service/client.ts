import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { camelizeKeys } from 'humps';
import { StatusCodes } from 'http-status-codes';

const { REACT_APP_API_KEY, REACT_APP_SERVER_API_VERSION, REACT_APP_SERVER_API_URL } = process.env;

const API_KEY = REACT_APP_API_KEY ? REACT_APP_API_KEY : '1f54bd990f1cdfb230adb312546d765d';
const SERVER_API_VERSION = REACT_APP_SERVER_API_VERSION ? REACT_APP_SERVER_API_VERSION : 3;
const SERVER_API_URL = REACT_APP_SERVER_API_URL
	? REACT_APP_SERVER_API_URL
	: 'https://api.themoviedb.org';

const apiClient = axios.create({
	baseURL: `${SERVER_API_URL}/${SERVER_API_VERSION}/`,
	timeout: 10_000,
	params: {
		api_key: API_KEY,
	},
	headers: {
		Accept: 'application/json',
	},
});

apiClient.interceptors.response.use((response: AxiosResponse) => {
	if (response.data && response.headers['content-type']?.includes('application/json')) {
		response.data = camelizeKeys(response.data);
	}

	return response;
});

export interface RequestError {
	status: number;
	data?: unknown;
}

export interface RequestParams {
	url: string;
	method: AxiosRequestConfig['method'];
	data?: AxiosRequestConfig['data'];
	params?: AxiosRequestConfig['params'];
}

const axiosBaseQuery =
	<R = unknown>(): BaseQueryFn<RequestParams, R, RequestError> =>
	async (args) => {
		const { url, method, data, params } = args;
		try {
			const result = await apiClient({ url, method, data, params });
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR,
					data: err.response?.data,
				},
			};
		}
	};

export { apiClient, axiosBaseQuery };

