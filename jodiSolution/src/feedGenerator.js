const moment = require('moment');

const categoryOrder = [
	'top stories',
	'most popular',
	'environment'
];

function reorderFeed(newsFeed) {
	//	Split them into categories
	let feeds = {};
	newsFeed.forEach((item) => {
		const { category, type } = item;
		if (!feeds[category]) feeds[category] = {};
		if (!feeds[category][type]) feeds[category][type] = [];
		feeds[category][type].push(item);
	});

	//	Reassemble them into the right order
	let orderedFeed = [];
	categoryOrder.forEach((category) => {
		const { video, story } = feeds[category];

		orderedFeed = [
			...orderedFeed, 
			...(video ? video : []), 
			...(story ? story : [])
		];
	});

	return Promise.resolve(orderedFeed);
}

function mergeVideoFeed(newsFeed, videoFeed) {
	return Promise.resolve(newsFeed.map((item) => {
		const { video_id, ...restOfItem } = item;
		if (!video_id) { return restOfItem;}

		const { id, ...videoItem } = videoFeed.find(vidItem => vidItem.id === video_id);

		return {...restOfItem, ...(videoItem && { video: videoItem })};
	}));
}

function decorate(feed) {
	return Promise.resolve(feed.map((item) => {
		const { updated, video, ...restOfItem } = item;
		if (updated) {
			restOfItem.updated = moment.unix(updated).format('D MMM YYYY');
		}
		if (video) {
			const { duration_secs, ...restOfVideo } = video;
			const duration = `${Math.floor(video.duration_secs / 60)}m ${video.duration_secs % 60}s`;
			restOfItem.video = { ...restOfVideo, duration };
		}
		return restOfItem;
	}));
}

function feedGenerator(newsFeed, videoFeed) {
	return reorderFeed(newsFeed)
		.then((feed) => mergeVideoFeed(feed, videoFeed))
		.then((feed) => decorate(feed));
}

module.exports = feedGenerator;
