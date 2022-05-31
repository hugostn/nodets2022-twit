# Tiago Gomes Sant'Ana

## Installation

Requeriments:

- [node.js](https://nodejs.org)
- [yarn](https://yarnpkg.com)
- [docker](https://www.docker.com/) (for tests)

First time install:

```sh
# install dependencies
yarn
# build
yarn build
# start server
yarn start
```

## Development
```sh
# install dependencies
yarn
# start server in dev watch mode
yarn dev
# start tests in watch mode for bdd
yarn watch
# starup dev postgresql server
bin/stackp.sh
# shutdown dev postgresql server
bin/stackdown.sh
```

For environment database server edit file src/config/base.ts or create other environments

#### Sample data

- http://localhost:3030/info (show all endpoints - future substitute with swagger)
- http://localhost:3030/users/user10 - user info
- http://localhost:3030/users/user10/feed - user feed
- http://localhost:3030/users/user10/feed?page=2 - user feed page 2
- http://localhost:3030/users/user10/feed?page=2&size=20 - user feed page 2, pageSize 20
- http://localhost:3030/feed - all posts
- http://localhost:3030/feed?page=3 - all posts page 3
- http://localhost:3030/feed?page=3&size=15 - all posts page 3, pageSize 15
- http://localhost:3030/feed/search/user10 - search for user10 word in posts comments
- http://localhost:3030/posts/search/quote - search for quote word in posts comments

## Planning

### Questions for Product Manager

- Would it be valueable to indicate that a post has replies on the homepage and/or on the user's profile page?
- Should replies count for daily number of posts allowed per user?
- Can a user reply to their own posts?

### Solution
- Extend postgres type post_type in create_tables.sql to add type 'reply';
- Filter /feed and /users/{id}/feed services to not show type 'reply';
- Create /users/{id}/feed-with-replies being same as /users/{id}/feed without filter by type.

## Critique

### Improvements

- By first, do all tests. For the sake of exercise I only did a very few;
  - In that matter, would have done unit tests for all layers, Data, Service and Controller, mocking every directly dependency.
  - Also would have done integration tests for all endpoints.
- Lots of middlewares to be implemented as auth, crsf, cors, logging, compression, validation, tracing, rate-limiting, caching, etc.
- Better  middleware for errors and better error handling separating bussiness error from system errors.
- Change build and dev process to use docker so it would be independent of developers environment.
- Create configs for QA, DEV and PROD environments.
- Create new queries for followers and followees, as also endpoint for isFollower().
- Add more validation and better errors message.
- Dockerize the final project product.
- Add CI/CD with Jenkins config.

### Scalling

So, there's 2 big failing points to this project, the api server and the postgresql database.

The database should become less performant as its sizes gets bigger and bigger.
- In the scenario, the first try would be to review indexes and queries based on the database's statistics.
- After this, maybe break down some tables into partitions would have some effect in DML and queries because it would be way faster to access data from few days ago.
- If that didn't do the trick, you have to start thinking about distributed databases. It could still be postgresql, probably with some SaaS provider. Or with some NoSQL database with high capacity of scale horizontally (more nodes within the cluster)(also with a SaaS provider).

For the server the first fail would be by number of requests.
- At first it could think to implement workers in the express server, but that wouldn't have to much effect since the application is not cpu intensive.
- So the better choice would be to scale it horizontaly, creating docker containers and deploying a cluster of it running behind a reverse proxy.
- It could be tried to implement the server in some multi-thread non blocking stack, like Java(Spring Async or WebFlux) or Golang.

At last, if those things also didn't do the trick, it could be done in another approach. Because this is a social network that the majority of its operations is with fresh data (data created in the last few days) and some tolerance to incosistency reads, it could be changed to microservice event driven architecture with CQRS pattern. It could be implemented with several databases for commands (including postgres) and others ones for optimized views (like MongoDB, Redis, ...) and some queue/event streaming tool (Kafka, RabbitMQ, AWS SNS/SQS), Datadog for tracing and auditing.