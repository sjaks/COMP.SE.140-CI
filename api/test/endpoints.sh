# Test API endpoints with cURL

# GET health check
curl -is dind-service:8083 | grep '200' && echo 'SUCCESS!'
curl -is dind-service:8083 | grep 'up' && echo 'SUCCESS!'

# GET messages
curl -is dind-service:8083/messages | grep '200' && echo 'SUCCESS!'
curl -is dind-service:8083/messages | grep -E -i '^.[0-9]*\-.[0-9]*\-.*Z\ [0-9]*.*MSG.*' && echo 'SUCCESS!'

# GET state
# curl -is dind-service:8083/state | grep '200' && echo 'SUCCESS!'
# curl -is dind-service:8083/state | grep 'up' && echo 'SUCCESS!'

# PUT state
# curl -is dind-service:8083/state | grep '201' && echo 'SUCCESS!'

# GET run-log
# curl -is dind-service:8083/run-log | grep '200' && echo 'SUCCESS!'

# GET node-statistic
# Optional

# GET queue-statistic
# Optional
