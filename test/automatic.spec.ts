import 'jest-environment-puppeteer';

const testServerUrl = process.env.TEST_SERVER_URL
	? process.env.TEST_SERVER_URL
	: 'http://localhost:3001';
jest.setTimeout(10_000);

test('should click on the first movie card and open movie details', async () => {
	await page.goto(testServerUrl);

	const movieCard = await page.waitForSelector('[itemprop="movie-card"]');
	const movieCardTitle = await movieCard?.evaluate((el) => el.getAttribute('title'));

	await movieCard?.click();

	const movieDetailMainHeader = await page.waitForSelector('[itemprop="main-header"]');
	const movieDetailMainHeaderText = await movieDetailMainHeader?.evaluate((el) => el.textContent);

	expect(movieCardTitle).toEqual(movieDetailMainHeaderText);
});

test('should click on pagination and load second movies page', async () => {
	await page.goto(testServerUrl);

	const paginationSecondButton = await page.waitForSelector('[aria-label="Go to page 2"]');
	await paginationSecondButton?.click();

	const activePaginationButton = await page.waitForSelector('[aria-current="true"]');
	const activePaginationButtonAriaLabel = await activePaginationButton?.evaluate((el) =>
		el.getAttribute('aria-label'),
	);

	expect(activePaginationButtonAriaLabel).toEqual('page 2');
});

test('should click focus search input, type a query and check if first result contains query', async () => {
	await page.goto(testServerUrl);

	await page.focus('[name="search-movie"]');
	await page.keyboard.type('Spider');

	const movieCard = await page.waitForSelector('[itemprop="movie-card"]');
	const movieCardTitle = await movieCard?.evaluate((el) => el.getAttribute('title'));

	expect(movieCardTitle).toContain('Spider');
});

