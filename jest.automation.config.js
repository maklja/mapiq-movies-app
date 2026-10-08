// eslint-disable-next-line no-undef
module.exports = {
	preset: 'jest-puppeteer',
	testEnvironment: 'puppeteer',
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	testRegex: '.*\\.spec\\.ts$',
};

