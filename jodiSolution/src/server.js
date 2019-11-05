const feedGenerator = require('./feedGenerator');

const Koa = require('koa');
const app = new Koa();

const fs = require('fs');
const newsFeed = JSON.parse(fs.readFileSync('../data-feed.json'));
const videoFeed = JSON.parse(fs.readFileSync('../video-meta.json'));

app.use((ctx) => {
	ctx.body = feedGenerator(newsFeed, videoFeed);
});

app.listen(3120, () => {
	console.log('Server listening. CTRL+C to quit');
});
