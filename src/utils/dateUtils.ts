export const formatDate = (date: string) => {
	if (!date) {
		return 'Unknown release date';
	}

	const timestamp = Date.parse(date);
	return new Date(timestamp).toLocaleDateString('en-GB');
};

