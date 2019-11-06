const fetch = require('superagent');
const feedGenerator = require('./feedGenerator');

const Koa = require('koa');
const app = new Koa();

let newsFeed;
let videoFeed;

app.use((ctx) => {
	return feedGenerator(newsFeed, videoFeed)
		.then((result) => { ctx.body = result});
});

function updateFeeds() {
	return Promise.all([
		fetch.get('https://raw.githubusercontent.com/neilmca/newsapp-code-challenge-temp/master/data-feed.json'),
		fetch.get('https://raw.githubusercontent.com/neilmca/newsapp-code-challenge-temp/master/video-meta.json')
	])
	.then(([feed, video]) => {
		newsFeed = JSON.parse(feed.text);
		videoFeed = JSON.parse(video.text);
		console.log('Feeds updated');
	});
}

updateFeeds()
.then(() => {
	app.listen(3120, () => {
		console.log('Server listening. CTRL+C to quit');
		setTimeout(updateFeeds, 5000);
	});
});
