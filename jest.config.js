// eslint-disable-next-line no-undef
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transformIgnorePatterns: ['/node_modules/(?!axios)'],
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	setupFilesAfterEnv: ['./src/setupTests.ts'],
	testRegex: '.*\\.test\\.tsx$',
};

