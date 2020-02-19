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
		const { feature, video, story } = feeds[category];

		orderedFeed = [
			...orderedFeed,
			...(feature ? feature : []),
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
	const currentYear = moment().year();

	return Promise.resolve(feed.map((item) => {
		const { updated, video, ...restOfItem } = item;
		const isFeature = item.type && item.type === 'feature';

		if (updated && !isFeature) {
			const updatedObj = moment.unix(updated);
			const displayFormat = updatedObj.year() === currentYear ? 'D MMM YYYY' : 'YYYY';
			restOfItem.updated = updatedObj.format(displayFormat);
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
