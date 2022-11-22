# Test API endpoints with cURL

# GET health check
curl -is dind-service:8083 | grep '200' && echo 'SUCCESS!'
curl -is dind-service:8083 | grep 'up' && echo 'SUCCESS!'

# GET messages

# GET state

# PUT state

# GET run-log

# GET node-statistic

# GET queue-statistic
