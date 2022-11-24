# Test API endpoints with cURL

# GET health check
curl -is localhost:8083 | grep '200' && echo 'SUCCESS!'
curl -is localhost:8083 | grep 'up' && echo 'SUCCESS!'

# GET messages
curl -is localhost:8083/messages | grep '200' && echo 'SUCCESS!'
curl -is localhost:8083/messages | grep -E -i '^.[0-9]*\-.[0-9]*\-.*Z\ [0-9]*.*MSG.*' && echo 'SUCCESS!'

# GET state
curl -is localhost:8083/state | grep '200' && echo 'SUCCESS!'
curl -is localhost:8083/state | grep 'RUNNING' && echo 'SUCCESS!'

# PUT state
curl -is -X PUT localhost:8083/state -d PAUSED | grep '201' && echo 'SUCCESS!'
curl -is localhost:8083/state | grep 'PAUSED' && echo 'SUCCESS!'
curl -is -X PUT localhost:8083/state -d RUNNING | grep '201' && echo 'SUCCESS!'
curl -is localhost:8083/state | grep 'RUNNING' && echo 'SUCCESS!'

# GET run-log
curl -is localhost:8083/run-log | grep '200' && echo 'SUCCESS!'
curl -is localhost:8083/run-log | grep 'RUNNING' && echo 'SUCCESS!'

