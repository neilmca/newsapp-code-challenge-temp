const feedGenerator = require('../src/feedGenerator');
const fs = require('fs');

const expectedOutput = JSON.parse(fs.readFileSync('../expected-output.json', 'utf8'));
const newsFeed = JSON.parse(fs.readFileSync('../data-feed.json'));
const videoFeed = JSON.parse(fs.readFileSync('../video-meta.json'));

describe('Integration Test of Feed Generator', () => {

	test('Can produce expected output with given input', () => {
		expect(feedGenerator(newsFeed, videoFeed)).toEqual(expectedOutput);
	});
});
