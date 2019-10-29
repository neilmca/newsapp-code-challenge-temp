# newsapp-code-challenge-temp

  

# BBC News and Weather Apps (Javascript) Coding Challenge

  

## Introduction

You have been asked to develop a Node.js service that will expose an API to deliver a feed of news items to clients.

The feed is constructed by integrating with two data sources.
* *Data Feed API* which returns a list of news items
* *Video Meta API* which returns metadata about video clips in the news feed

The output (client) feed must merge information from the *Data Feed API* with data from the *Video Meta API* to produce an API endpoint that conforms to the requirements laid out below.

## Business Requirements

### Ordering Requirements
The output feed must be ordered using the following logic.

The *category* field is used to order items in the following order.
REQ1: All  items of *category": "top stories"* go first
REQ2: All  items of *category": "most popular"* go next
REQ3: All  items of *category": "environment"* go last

There is a further business requirement that states
REQ4: For a given category, items of *"type": "video"* should go before items of *"type": "story"* 

And finally,
REQ5: The ordering of a sequence of items of the same *type* is unimportant. E.g. For example, if there are three *story* items below a *video* item then the order of the individual story items in relation to each other does not matter.

### DateTime Requirements

The Data Feed API has an *updated* field that  holds the last time the item was updated. It is a timestamp in epoch time but the output API should instead return this in an ISO 8601 UTC format.

```YYYY-MM-DDThh:mm:ssZ```

E.g. *"updated":"2015-11-27T05:08:30Z"*

### Enriching the Data Feed with Video Metadata Requirements

The *video_id* present in the Data Feed API should not be present in the output feed. In its place should be a *video* block containing metadata for the video clip.

E.g. 

```
"video" : {
    "duration_secs" : 98,
    "caption": "Signal path",
    "placeholder_image": "ichef.bbci.co.uk/images/ic/$recipe/p55e60yi.jpg",
    "video_url" : "http://open.live.bbc.co.uk/mediaselector/format/json/mediaset/mobile-phone-main/vpid/p99w2qw9"
    }
```

## Example Output Feed
 Given business rules above and for the example data set provided the expected output feed will look like:
 
 https://github.com/neilmca/newsapp-code-challenge-temp/blob/master/expected-output.json

Note: As per REQ5 above it is acceptable for the sequence of *story* items to vary from the example above since their order in relation to each other is unimportant.
  
## Data Source APIs
### Data Feed API

API that returns an **unordered** list of news feed items

https://github.com/neilmca/newsapp-code-challenge-temp/blob/master/data-feed.json

```bash

curl -G https://raw.githubusercontent.com/neilmca/newsapp-code-challenge-temp/blob/master/data-feed.json

```

  

An item can either be of type *story* or of type *video*. Items of type *video* will have an *video_id* (e.g. "video_id":"p07sb8b1") field that can be used in a batch call to the Video Metadata API to return metadata needed to included in the output feed to the clients.

  

### Video Metadata API

API to batch request metadata for video clips associated to news items

https://github.com/neilmca/newsapp-code-challenge-temp/blob/master/video-meta.json

```bash

curl -G

https://raw.githubusercontent.com/neilmca/newsapp-code-challenge-temp/blob/master/video-meta.json?id=p91a64ab,p07sb8b1,p07d60yr,p66j71gh

```
## Considerations
This is an opportunity to demonstrate your understanding of building a service to integrate, merge, transform data and make that available through an API. 

We believe that good contributors to achieving this are typically code readability, separation of concerns and good demonstration of test coverage. 

Remember we are looking for a demonstration of your skills - not perfection. A comment about what you would do next might be better than squeezing in everything, but not doing anything to your usual standard. We would typically expect this to take you a couple evenings at most.

## Submissions
  
To submit your code, please create a private GitHub repo (it’s free) and share your code repo with our GitHub user, [to do](https://github.com/bbcnewsapps). Please note that we will be considering your git commit history during our evaluation.

_Under no circumstances make the repository public._

_Please email your BBC Careers contact separately as well to confirm your submission._