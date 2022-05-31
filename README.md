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

