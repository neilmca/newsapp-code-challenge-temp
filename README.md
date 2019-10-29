# newsapp-code-challenge-temp

# BBC News and Weather Apps (Javascript) Coding Challenge

## Introduction
You have been asked to integrate with two new data sources that when joined together will provide a feed of news items to the mobile (Android and iOS) clients.

###Data Feed API
Unordered list of items in the news feed
https://github.com/neilmca/newsapp-code-challenge-temp/blob/master/data-feed.json
```bash
curl -G https://raw.githubusercontent.com/neilmca/newsapp-code-challenge-temp/blob/master/data-feed.json
```
###Video Metadata API
API to batch request metadata for video clips associated to news items
https://github.com/neilmca/newsapp-code-challenge-temp/blob/master/video-meta.json
```bash
curl -G 
https://raw.githubusercontent.com/neilmca/newsapp-code-challenge-temp/blob/master/video-meta.json?id=p91a64ab,p07sb8b1,p07d60yr,p66j71gh
```


You have been asked to kick off a new native iOS news app, initially consisting of two screens
- The first screen will simply display a list of the headlines (fetched from a server - see below) and the last updated date
- When the user taps on a headline, the application then shows a second screen containing the headline and the last updated date again, as well as the introductory paragraph

The designer has asked that the typography be as follows:

Components | Color | Font
-----------| ------|------
headline | 0x000000 | large, bold, system font
last updated | 0x3d3d3d | normal, light, system font, 
introductory | 0x000000 | normal, regular, system font

The returned timestamp is in epoch time but the design calls for this to be a human readable day, month and year. So, for example, it should show as "1 January 1970" for an epoch timestamp of 0.

The user should also be able to trigger a reload of the data from the server.

### API
The list of headlines is available at
https://github.com/bbc/news-apps-ios-coding-challenge/blob/master/headlines.json

```bash
curl -G https://raw.githubusercontent.com/bbc/news-apps-coding-challenge/master/headlines.json
```

### Analytics
The product manager needs you to record interaction and network events as people use the app. This can be done by issuing “fire and forget” GET requests to
https://github.com/bbc/news-apps-ios-coding-challenge/blob/master/analytics

Event specific query parameters should be appended to the URL as follows:

* `event=load` – any network request
* `time=xxx` - the time (in ms) for the network request to complete
* `event=display` – whenever a screen is shown (the headline or the article)
* `screen=XXX` - an identifier for the screen that was shown

```bash
curl -G https://raw.githubusercontent.com/bbc/news-apps-ios-coding-challenge/master/analytics?event=load&data=100
```

### Considerations
This is an opportunity to demonstrate your understanding of what modern iOS app development looks like. We believe that good contributors to achieving this are typically code readability, unit testing, separation of concerns, the open/closed principle, error handling, and an intuitive, responsive, user interface.

You can write the app in either Swift or Objective-C, but _you should not use any third party libraries_.  

Remember we are looking for a demonstration of your skills - not perfection. A comment about what you would do next might be better than squeezing in everything, but not doing anything to your usual standard. We would typically expect this to take you  a few evenings at most.

### Submissions
To submit your code, please create a private GitHub repo (it’s free) and share your code repo with our GitHub user, [bbcnewsapps](https://github.com/bbcnewsapps). Please note that we will be considering your git commit history during our evaluation.

_Under no circumstances make the repository public._
_Please email your BBC Careers contact separately as well to confirm your submission._

