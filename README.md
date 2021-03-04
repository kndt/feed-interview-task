# Feed Backend Task

At Feed we make use of Facebook's Marketing API to help our users grow their
brand awareness. One of Feed's features is to automate ad creation using a
users social media posts. To give users an idea how their posts perform as ads,
we aggregate multiple insights and calculate a performance score.

For this Exercise we recommend spending no longer than a couple of hours. Your
submission does not need to be complete but do be prepared to discuss your
solution in the subsequent feedback stage. It's recommended to add comments
for any assumptions made or missing implementation details and feel free to 
ask any relevant questions. 

In the follow up interview you will require to demo your system working and talk 
through the solution, possible pitfalls and other considerations or approaches.
The feedback stage will involve talking to a couple of the developers where we 
will tell you more about what we're building and how you can help us grow the platform.

A solution using TypeScript is preferred although plain JavaScript is also OK. 

In this exercise you are tasked with writing a script that accomplish the following funcionality,
feel free to include any package dependencies that are required and keep note of any references you might use like stackoverflow.

## ETL Exercise
Create a service for watching a directory for any new json files. For example using a node js daemon.

Behaviour:
- When a new *ad_insights* file arrives to the directory, parse it and calculate the following:
> - Aggregate the spend by account_id and display top 3 spending accounts.
> - Aggregate the spend by campaign and display the top 3 spending campaigns. 
> - Calculate the min,max and average cost per impression per spending account.
- Output the result in json format on a new file.

Consider how to handle corrupt files, errors, throttling and high throughput scenarios.

## Endpoint Exercise 
Using the post_ads.json file create a GET endpoint (`GET /posts/:postId`) that can accept a post id and returns its aggregated the following insights data:

> - The spend per outbound click, i.e. `post_total_spend / post_total_outbound_clicks`. See [Example Response](#example-response).
> - Write unit and/or functional tests.

## Submission

Please submit your solution via either:
- a repository on GitHub (or similar)
- an e-mail attachment

If you choose the latter, be sure to omit any dependencies handled by a  package
manager. `git` can be used to create an archive like so:

```sh
git archive --format zip --output solution.zip main
```

## Provided Files

In the `data` directory are two files, [ad_insights.json](data/ad_insights.json)
and [post_ads.json](data/post_ads.json).

**post_ads.json**

An intermediate file mapping `posts` to `ad_insights`. Use `id` to fetch posts
by their id and `ad_id` to "join" to `ad_insights.id`.


**ad_insights.json**

Provides sample ad insights in the same format that would be returned via
Facebook's Marketing API.

## Example Response


**Input data:**

_post_ads.json_

```json
[
  { "id": "23845182590980675", "ad_id": "23845211039190675" },
  { "id": "23845182590980675", "ad_id": "23846861012330675" }
]
```

_ad_insights.json_

```json
[
  {
    "id": "23845211039190675",
    "insights": {
      "data": {
        "date_start": "2021-02-01",
        "date_stop": "2021-02-01",
        "actions": [ { "action_type": "post_engagement", "value": "38" } ],
        "impressions": "192",
        "outbound_clicks": [ { "action_type": "outbound_click", "value": "1" } ],
        "spend": "0.38"
      }
    }
  },
  {
    "id": "23845211039190675",
    "insights": {
      "data": {
        "date_start": "2021-02-02",
        "date_stop": "2021-02-02",
        "actions": [ { "action_type": "post_engagement", "value": "91" } ],
        "impressions": "364",
        "spend": "0.89"
      }
    }
  },
  {
    "id": "23846861012330675",
    "insights": {
      "data": {
        "date_start": "2021-02-01",
        "date_stop": "2021-02-01",
        "actions": [ { "action_type": "post_engagement", "value": "11" } ],
        "impressions": "232",
        "outbound_clicks": [ { "action_type": "outbound_click", "value": "2" } ],
        "spend": "0.38"
      }
    }
  },
  {
    "id": "23846861012330675",
    "insights": {
      "data": {
        "actions": [ { "action_type": "post_engagement", "value": "6" } ],
        "date_start": "2021-02-02",
        "date_stop": "2021-02-02",
        "impressions": "589",
        "outbound_clicks": [ { "action_type": "outbound_click", "value": "1" } ],
        "spend": "0.92"
      }
    }
  }
]
```

**Response:**

_Your response does not need to match the below format, the most important thing
is the "cost per outbound click". In the real application we use multiple values
to create the performance score so you may wish to structure your code in a way
that allows for aggregating all insights data. Doing so is optional._

```json
[
  {
    "post_id": "23845182590980675",
    "insights": {
      "data": {
        "date_start": "2021-02-01",
        "date_stop": "2021-02-02",
        "actions": [ { "action_type": "post_engagement", "value": "146" } ],
        "impressions": "1377",
        "outbound_clicks": [ { "action_type": "outbound_click", "value": "4" } ],
        "spend": "2.57"
      },
      "summary": {
        "cost_per_outbound_click": "0.6425"
      }
    }
  }
]
```
