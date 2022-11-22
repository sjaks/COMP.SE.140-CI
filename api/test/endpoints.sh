# Test API endpoints with cURL

# GET health check
curl -is http://localhost:8083/ | grep '200'
curl -is http://localhost:8083/ | grep 'up'

# GET messages
# curl -is http://localhost:8083/messages

# GET state
# curl -is http://localhost:8083/state

# PUT state
# curl -is http://localhost:8083/state

# GET run-log
# curl -is http://localhost:8083/run-log

# GET node-statistic
# curl -is http://localhost:8083/node-statistic

# GET queue-statistic
# curl -is http://localhost:8083/queue-statistic
