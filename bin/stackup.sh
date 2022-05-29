#!/bin/bash

echo "+ docker-compose -f "__tests__/postgresql/docker-compose-yml" up --force-recreate -d"

docker-compose -f "__tests__/postgresql/docker-compose-yml" up --force-recreate -d