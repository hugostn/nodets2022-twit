#!/bin/bash
echo "+ docker-compose -f "__tests__/postgresql/docker-compose-yml" down"
docker-compose -f "__tests__/postgresql/docker-compose-yml" down
