# Documentation for the messaging exercise

```
$ uname -a; docker --version; docker-compose --version
Linux desktop 5.19.14-200.fc36.x86_64 #1 SMP PREEMPT_DYNAMIC Wed Oct 5 21:31:17 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
Docker version 20.10.21, build baeda1f
docker-compose version 1.29.2, build unknown
```

### Benefits of topic-based communication
Topic based communication is mean to be two-way compared to how HTTP is a
server-client protocol. Request-response protocols (HTTP here) tend to be
heavier as they have quite a lot of overhead in the packets. Our MQ protocol
doesn't have that much overhead and should be faster.

This rabbitMQ implementation also works with just a few functions whereas
an HTTP implementation would require client and server implementations
in all microservices.

### Main learnings
I learned to use RabbitMQ for a topic based communication on top of message
channel queues. I also learned to use Docker volumes a bit better.

### How to run
```
$ git clone -b messaging git@course-gitlab.tuni.fi:compse140-2022-2023/jakonens.git
$ docker-compose build –-no-cache
$ docker-compose up -d

$ curl localhost:8080
$ docker-compose down
```

By running these commands (and waiting until the composition is up after docker-compose up),
the required message log lines should be accessible with curl from the HTTP server.
