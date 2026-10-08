// eslint-disable-next-line no-undef
module.exports = {
	launch: {
		dumpio: true,
		// eslint-disable-next-line no-undef
		headless: process.env.HEADLESS === 'true',
		args: ['--disable-infobars', '--window-size=1200,800'],
		defaultViewport: null,
		slowMo: 200,
	},
	browserContext: 'default',
};

