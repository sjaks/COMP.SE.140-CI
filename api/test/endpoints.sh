# Test API endpoints with cURL

# GET health check
curl -is dind-service:8083 | grep '200'
curl -is dind-service:8083 | grep 'up'

# GET messages

# GET state

# PUT state

# GET run-log

# GET node-statistic

# GET queue-statistic
