import { GenreResponse } from './genre';

export interface MovieResponse {
	id: number;
	title: string;
	overview: string;
	posterPath: string | null;
	backdropPath: string | null;
	releaseDate: string;
	genreIds: number[];
}

export interface MovieDetailResponse {
	id: number;
	title: string;
	overview: string | null;
	posterPath: string | null;
	releaseDate: string;
	genres: GenreResponse[];
}
