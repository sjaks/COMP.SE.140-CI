#!/bin/bash
# Test API endpoints with cURL
# Usage:
#   ./tests/endpoint.sh <hostname>
#   e.g. ./tests/endpoint.sh localhost
#
# The script defaults to dind-service, which is the internal
# name of the container in docker-compose. It is the default
# hostname in CI runs.

if [ "$1" != "" ]; then
    HOSTNAME=$1
else
    HOSTNAME=dind-service
fi

# GET health check
curl -is $HOSTNAME:8083 | grep '200' && echo 'SUCCESS!'
curl -is $HOSTNAME:8083 | grep 'up' && echo 'SUCCESS!'

# GET messages
curl -is $HOSTNAME:8083/messages | grep '200' && echo 'SUCCESS!'
curl -is $HOSTNAME:8083/messages | grep -E -i '^.[0-9]*\-.[0-9]*\-.*Z\ [0-9]*.*MSG.*' && echo 'SUCCESS!'

# GET state
curl -is $HOSTNAME:8083/state | grep '200' && echo 'SUCCESS!'
curl -is $HOSTNAME:8083/state | grep 'RUNNING' && echo 'SUCCESS!'

# PUT state
curl -is -X PUT $HOSTNAME:8083/state -d PAUSED | grep '201' && echo 'SUCCESS!'
curl -is $HOSTNAME:8083/state | grep 'PAUSED' && echo 'SUCCESS!'
curl -is -X PUT $HOSTNAME:8083/state -d RUNNING | grep '201' && echo 'SUCCESS!'
curl -is $HOSTNAME:8083/state | grep 'RUNNING' && echo 'SUCCESS!'

# GET run-log
curl -is $HOSTNAME:8083/run-log | grep '200' && echo 'SUCCESS!'
curl -is $HOSTNAME:8083/run-log | grep 'RUNNING' && echo 'SUCCESS!'
