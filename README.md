# newsapp-code-challenge-temp

# BBC News and Weather Apps (Javascript) Coding Challenge  

## Introduction

You have been asked to develop a Node.js API endpoint to deliver a feed of news items to clients.

The feed is constructed by integrating with two data sources.

* *[Data Feed API](#data-feed-api)* which returns a list of news items
* *[Video Meta API](#video-metadata-api)* which returns metadata about video clips in the news feed

The output (client) feed must merge information from the *Data Feed API* with data from the *Video Meta API* to produce an API endpoint that conforms to the requirements laid out below.

## Business Requirements

### Ordering Requirements
The output feed must be ordered using the following logic.

The *category* field is used to order items in the following order.
* REQ1: All  items of *"category": "top stories"* go first
* REQ2: All  items of *"category": "most popular"* go next
* REQ3: All  items of *"category": "environment"* go last

There is a further business requirement that states
* REQ4: For a given category, items of *"type": "video"* should go before items of *"type": "story"* 

And finally,
* REQ5: Feed order should be preserved within a specific grouping (i.e. category & type). E.g.
Given a feed consisting of items A, B, C, D where they all the same category, but B is a video. Then the required order would be B, A, C, D.


### DateTime Requirements

The Data Feed API has an *updated* field that  holds the last time the item was updated. It is a timestamp in epoch time but the output API should instead return in the format below.

```D MMM YYYY```

E.g. *"updated":"12 Oct 2019"*

### Enriching the Data Feed with Video Metadata Requirements

The *video_id* maps to the *id* field in the Video Meta API.

REQ6: The *video_id* present in the Data Feed API should not be present in the output feed. The output feed should include a *video* block containing metadata for the video clip.

REQ7: The *durations_sec* field form the Video Meta API needs to be transformed from seconds into a human readable format as per the example below.

E.g. 

```
"video" : {
    "duration" : "1m 48s",
    "caption": "Signal path",
    "placeholder_image": "ichef.bbci.co.uk/images/ic/$recipe/p55e60yi.jpg",
    "video_url" : "http://open.live.bbc.co.uk/mediaselector/format/json/mediaset/mobile-phone-main/vpid/p99w2qw9"
    }
```

## Example Output Feed
 Given the business rules above and for the example data set provided the expected output feed will be:
 
 https://github.com/neilmca/newsapp-code-challenge-temp/blob/master/expected-output.json

  
## Data Source APIs
### Data Feed API

API that returns a list of news feed items

```bash

curl -G  https://raw.githubusercontent.com/neilmca/newsapp-code-challenge-temp/master/data-feed.json

```

An item can either be of type *story* or of type *video*. Items of type *video* will have a *video_id* (e.g. "video_id":"p07sb8b1"). The *video_id* field maps to the the *id* field in the video metadata returned from the *Video Metadata API*.
  

### Video Metadata API

API to fetch metadata for video clips.

```bash

curl -G https://raw.githubusercontent.com/neilmca/newsapp-code-challenge-temp/master/video-meta.json

```

## Criteria

We would like you to use Node.js and JS (>ES5). It is fine to use third-party libraries in your solution.

Please include in your README how to setup and run your solution.

## Considerations
This is an opportunity to demonstrate your understanding of building a service to integrate, merge,  transform data and make that available through an API. 

We believe that good contributors to achieving this are typically code readability, separation of concerns and good demonstration of test coverage. 

Remember we are looking for a demonstration of your skills - not perfection. A comment about what you would do next might be better than squeezing in everything, but not doing anything to your usual standard. We would typically expect this to take you a couple evenings at most.

## Submissions
  
To submit your code, please create a private GitHub repo (it’s free) and share your code repo with our GitHub user, [newsapps-js](https://github.com/newsapps-js). Please note that we will be considering your git commit history during our evaluation.

_Under no circumstances make the repository public._

_Please email your BBC Careers contact separately as well to confirm your submission._