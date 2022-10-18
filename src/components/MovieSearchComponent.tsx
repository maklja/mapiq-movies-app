import { ChangeEvent, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useDebouncedCallback } from 'use-debounce';

export interface MovieSearchComponentProps {
	value?: string;
	onChange?: (searchQuery: string) => void;
}

export const MovieSearchComponent = (props: MovieSearchComponentProps) => {
	const [search, setSearch] = useState(props.value ?? '');
	const [stickyPosition, setStickyPosition] = useState(false);

	const triggerOnChange = useDebouncedCallback(
		(searchQuery: string) => props.onChange?.(searchQuery),
		300,
	);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const searchQuery = e.target.value.trim();
		setSearch(searchQuery);
		triggerOnChange(searchQuery);
	};

	const handleScroll = () => {
		const position = window.pageYOffset;
		setStickyPosition(position / window.outerHeight > 0.05);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<Box p={0.3} position={stickyPosition ? 'fixed' : 'relative'} zIndex={10}>
			<Paper>
				<TextField
					name="search-movie"
					placeholder="Search movie"
					size="small"
					value={search}
					onChange={handleOnChange}
					inputProps={{
						'aria-label': 'search movies',
					}}
				/>
			</Paper>
		</Box>
	);
};

