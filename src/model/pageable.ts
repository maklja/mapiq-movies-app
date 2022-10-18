export interface Pageable<T> {
	page: number;
	totalPages: number;
	totalResults: number;
	results: T[];
}

