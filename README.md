# Documentation for the course project

```
$ uname -a; docker --version; docker-compose --version
Linux desktop 5.19.14-200.fc36.x86_64 #1 SMP PREEMPT_DYNAMIC Wed Oct 5 21:31:17 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
Docker version 20.10.21, build baeda1f
docker-compose version 1.29.2, build unknown
```

## 1. Instructions for the teaching assistant
Optional feature: Implement a static analysis step in the pipeline by using eslint 
  - The CI pipeline has a lint-test job that runs *eslint* for the source code using the config in .eslintrc.js
  - The CI to pass, the linter needs to run a successful run in GitLab
  - Logs provided below 

**Instructions for running the system locally:**

Clone and run the project:
```
git clone -b project git@course-gitlab.tuni.fi:compse140-2022-2023/jakonens.git 
cd jakonens
docker-compose build –-no-cache
docker-compose up -d
```

Now the RESTful API can be queried with something like:
```
curl localhost:8083/messages -H 'Content-Type: text/plain'
curl localhost:8083/state -X put -d 'PAUSED' -H 'Content-Type: text/plain' -H 'Accept: text/plain'
curl localhost:8083/state -H 'Contegit addnt-Type: text/plain'
curl localhost:8083/run-log -H 'Content-Type: text/plain'
```

Tests are run in GitLab CI but to manually run them locally:
```
./tests/endpoints.sh
```

#### TODO: make tests runnable locally -> localhost parameter

## 2. Description of the CI/CD pipeline

### Use of version management
Gitlab.com was used as the main version management system. Since the GitLab instance provided by school did not
provide GitLab Runners, another GitLab instance was hosted on my local machine.

In both Git instances, a branch named project was used. It was treated as a development or feature branch as
it is not the main branch of the project. Development was made in small commits where one commit usually
corresponded with one medium-sized feature or a single fix. A test-driven approach was used, where tests were
implemented according to the project API spec first - and then the feature based on the tests.

### Building tools
The program is implemented in mostly vanilla Javascript (Node.js) and the different services are installed with
`npm install` with Docker. The different service containers are orchestrated with docker-compose so that the
project can be built with `docker-compose build`.

### Testing tools and cases
The project is tested with simple Bash scripts found under `./tests`. There is one script at the moment, called `endpoints.sh` that tests the REST routes of the outside facing API. The following cases are tested. cURL is used for the HTTP requests.

- GET `localhost:8083/` assert healthcheck `status code == 200`
- GET `localhost:8083/` assert healthcheck `body == up`
- GET `localhost:8083/messages` assert messages `status code == 200`
- GET `localhost:8083/messages` assert messages `body == <date><test of the msg>`
- GET `localhost:8083/state` assert state `status code == 200`
- GET `localhost:8083/state` assert state `status == <state>`
- PUT `localhost:8083/state` assert state `status code == 201`
- PUT `localhost:8083/state` set state `state = <state>`

The code is also linted with eslint, which is a simple form of dynamic testing.

### Packing
The project is packed using Docker. The different services are build into images by docker-compose.
The containers could be published in the Docker Hub or transferred via Gitlab or Github in the future.

### Deployment
Currently the pipeline deploys the packages simply to the GitLab runner as the CI/CD pipeline runs
a linter and the API (integration) tests after `docker-compose up`. There is also a deployment job
in the pipeline that simulates the setting up and deployment of the project. It could be extended
to automatically deploy the application to an outside server with, for instance, Ansible.

### Operating
The program can be operated with its API and a shutdown command can be used to turn it off.
Docker-compose commands can be used for maintenance purposes.

## 3. Example runs of the pipeline

![success](https://i.imgur.com/nf1QYcz.png)
After the linter, integration tests and deployment have successfully finished, we can see a checkmark next to the commit.

### Successful lint run
```
Running with gitlab-runner 15.5.1 (7178588d)
  on dex2 ZUYkaeQr
Preparing the "docker" executor
Using Docker executor with image docker:20.10.16 ...
Starting service docker:20.10.16-dind ...
Pulling docker image docker:20.10.16-dind ...
Waiting for services to be up and running (timeout 30 seconds)...
-- Redacted--
2022-11-24T14:26:33.741471865Z Generating RSA private key, 4096 bit long modulus (2 primes)
2022-11-24T14:26:34.686462358Z e is 65537 (0x010001)
2022-11-24T14:26:34.699225777Z Generating RSA private key, 4096 bit long modulus (2 primes)
-- Redacted --
2022-11-24T14:26:35.920096974Z time="2022-11-24T14:26:35.919994263Z" level=info msg="Starting up"
-- Redacted --
2022-11-24T14:26:36.173374974Z time="2022-11-24T14:26:36.173320644Z" level=info msg="Daemon has completed initialization"
2022-11-24T14:26:36.218957423Z time="2022-11-24T14:26:36.218779012Z" level=info msg="API listen on /var/run/docker.sock"
2022-11-24T14:26:36.223235096Z time="2022-11-24T14:26:36.223157546Z" level=info msg="API listen on [::]:2376"
Pulling docker image docker:20.10.16 ...
-- Redacted --
Reinitialized existing Git repository in /builds/gitlab-instance-f69c1852/jakonens/.git/
Checking out acfbf8cd as project...
Skipping Git submodules setup
Executing "step_script" stage of the job script
-- Redacted --
$ apk update
fetch https://dl-cdn.alpinelinux.org/alpine/v3.16/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.16/community/x86_64/APKINDEX.tar.gz
v3.16.3-13-g4d933a1fa3 [https://dl-cdn.alpinelinux.org/alpine/v3.16/main]
v3.16.3-12-g2affb64843 [https://dl-cdn.alpinelinux.org/alpine/v3.16/community]
OK: 17050 distinct packages available
$ apk add py-pip python3-dev libffi-dev openssl-dev gcc libc-dev make curl npm
(1/53) Upgrading musl (1.2.3-r0 -> 1.2.3-r2)
(2/53) Upgrading libcrypto1.1 (1.1.1o-r0 -> 1.1.1s-r0)
(3/53) Upgrading libssl1.1 (1.1.1o-r0 -> 1.1.1s-r0)
-- Redacted --
(53/53) Installing python3-dev (3.10.8-r0)
Executing busybox-1.35.0-r13.trigger
Executing ca-certificates-20211220-r0.trigger
OK: 305 MiB in 71 packages
$ npm install -g eslint
added 97 packages, and audited 98 packages in 4s
24 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
$ eslint .
Job succeeded
```

### Erroneous lint run
```
-- Redacted (similar output as above) --
$ npm install -g eslint
added 97 packages, and audited 98 packages in 3s
24 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
$ eslint .
/builds/gitlab-instance-f69c1852/jakonens/api/api.js
  19:14  error  Multiple spaces found before '('  no-multi-spaces
  38:35  error  Expected { after 'if' condition   curly
/builds/gitlab-instance-f69c1852/jakonens/orig/orig.js
  29:49  error  Missing semicolon                    semi
  36:15  error  Expected '===' and instead saw '=='  eqeqeq
  40:15  error  Expected '===' and instead saw '=='  eqeqeq
✖ 5 problems (5 errors, 0 warnings)
  3 errors and 0 warnings potentially fixable with the `--fix` option.
ERROR: Job failed: exit code 1
```

### Successful integration test run
```
Running with gitlab-runner 15.5.1 (7178588d)
Preparing the "docker" executor
Using Docker executor with image docker:20.10.16 ...
Starting service docker:20.10.16-dind ...
Pulling docker image docker:20.10.16-dind ...
-- Redacted --
Waiting for services to be up and running (timeout 30 seconds)...
-- Redacted --
2022-11-24T15:37:47.861795589Z Generating RSA private key, 4096 bit long modulus (2 primes)
2022-11-24T15:37:49.593389205Z Generating RSA private key, 4096 bit long modulus (2 primes)
-- Redacted --
Pulling docker image docker:20.10.16 ...
-- Redacted --
Reinitialized existing Git repository in /builds/gitlab-instance-f69c1852/jakonens/.git/
Checking out 274c02c7 as project...
Skipping Git submodules setup
Executing "step_script" stage of the job script
-- Redacted --
$ apk update
fetch https://dl-cdn.alpinelinux.org/alpine/v3.16/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.16/community/x86_64/APKINDEX.tar.gz
v3.16.3-13-g4d933a1fa3 [https://dl-cdn.alpinelinux.org/alpine/v3.16/main]
v3.16.3-12-g2affb64843 [https://dl-cdn.alpinelinux.org/alpine/v3.16/community]
OK: 17050 distinct packages available
$ apk add py-pip python3-dev libffi-dev openssl-dev gcc libc-dev make curl npm
(1/53) Upgrading musl (1.2.3-r0 -> 1.2.3-r2)
(2/53) Upgrading libcrypto1.1 (1.1.1o-r0 -> 1.1.1s-r0)
(3/53) Upgrading libssl1.1 (1.1.1o-r0 -> 1.1.1s-r0)
-- Redacted --
(53/53) Installing python3-dev (3.10.8-r0)
Executing busybox-1.35.0-r13.trigger
Executing ca-certificates-20211220-r0.trigger
OK: 305 MiB in 71 packages
$ pip install docker-compose
Collecting docker-compose
  Downloading docker_compose-1.29.2-py2.py3-none-any.whl (114 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 114.8/114.8 kB 9.4 MB/s eta 0:00:00
-- Redacted --
Successfully installed PyYAML-5.4.1 attrs-22.1.0 bcrypt-4.0.1 certifi-2022.9.24 cffi-1.15.1 charset-normalizer-2.1.1 cryptography-38.0.3 distro-1.8.0 docker-6.0.1 docker-compose-1.29.2 dockerpty-0.4.1 docopt-0.6.2 idna-3.4 jsonschema-3.2.0 paramiko-2.12.0 pycparser-2.21 pynacl-1.5.0 pyrsistent-0.19.2 python-dotenv-0.21.0 requests-2.28.1 texttable-1.6.7 urllib3-1.26.13 websocket-client-0.59.0
-- Redacted --
$ docker-compose -f docker-compose.yml build --no-cache
#1 [mq/httpserv:latest internal] load build definition from Dockerfile
#1 transferring dockerfile: 191B done
#1 DONE 0.4s
-- Redacted --
#12 extracting sha256:6b8b45e7dff2dc750e962a584ef1e06d2b437343753c73867a1d49c2eab0445d
#12 extracting sha256:6b8b45e7dff2dc750e962a584ef1e06d2b437343753c73867a1d49c2eab0445d 0.2s done
#12 extracting sha256:c30787d15cd36e52b35e1b617e6c26b1518286f500137ed1702530f2974f8c23 done
#12 DONE 14.9s
-- Redacted --
#31 [mq/imed:latest 5/5] RUN npm install
-- Redacted --
#31 DONE 1.8s
#30 [mq/imed:latest] exporting to image
-- Redacted --
#32 [mq/orig:latest 5/5] RUN npm install
-- Redacted --
#32 DONE 1.7s
#30 [mq/httpserv:latest] exporting to image
-- Redacted --
#29 [mq/api:latest 5/5] RUN npm install
-- Redacted --
#29 DONE 2.2s
#30 [mq/api:latest] exporting to image
-- Redacted --
#33 [mq/obse:latest 5/5] RUN npm install
-- Redacted --
#33 DONE 2.7s
#30 [mq/obse:latest] exporting to image
-- Redacted --
#30 DONE 4.6s
$ docker-compose -f docker-compose.yml up -d --remove-orphans
rabmq Pulling 
eaead16dc43b Pulling fs layer 
d5e775568c00 Pulling fs layer 
de99a1ffedd3 Pulling fs layer 
32e52a38037e Pulling fs layer 
01a79ee9a1ab Pulling fs layer 
e704e07f62a6 Pulling fs layer 
796a69cd2d92 Pulling fs layer 
673d47469271 Pulling fs layer 
cc0a988f4614 Pulling fs layer 
15c6341064ed Pulling fs layer 
01a79ee9a1ab Waiting 
cc0a988f4614 Waiting 
e704e07f62a6 Waiting 
796a69cd2d92 Waiting 
15c6341064ed Waiting 
673d47469271 Waiting 
32e52a38037e Waiting 
d5e775568c00 Downloading [>                                                  ]  18.55kB/1.835MB
de99a1ffedd3 Downloading [>                                                  ]  523.6kB/52.3MB
eaead16dc43b Downloading [>                                                  ]  294.9kB/28.58MB
d5e775568c00 Downloading [============================================>      ]  1.637MB/1.835MB
d5e775568c00 Verifying Checksum 
d5e775568c00 Download complete 
-- Redacted --
rabmq Pulled 
Network jakonens_mqnet  Creating
Network jakonens_mqnet  Created
Volume "jakonens_mqlogs"  Creating
Volume "jakonens_mqlogs"  Created
Container jakonens-rabmq-1  Creating
Container jakonens-httpserv-1  Creating
-- Redacted --
Container jakonens-imed-1  Starting
Container jakonens-orig-1  Starting
Container jakonens-obse-1  Starting
Container jakonens-orig-1  Started
Container jakonens-imed-1  Started
Container jakonens-obse-1  Started
$ sleep 15
$ chmod +x tests/endpoints.sh
$ ./tests/endpoints.sh
HTTP/1.1 200 OK
SUCCESS!
up
SUCCESS!
HTTP/1.1 200 OK
SUCCESS!
2022-11-24T15:39:34.412Z 1 MSG_1 to compse140.o
2022-11-24T15:39:35.461Z 2 Got MSG_1 to compse140.i
2022-11-24T15:39:37.413Z 3 MSG_2 to compse140.o
2022-11-24T15:39:38.461Z 4 Got MSG_2 to compse140.i
2022-11-24T15:39:40.413Z 5 MSG_3 to compse140.o
2022-11-24T15:39:41.464Z 6 Got MSG_3 to compse140.i
2022-11-24T15:39:43.415Z 7 MSG_4 to compse140.o
2022-11-24T15:39:44.463Z 8 Got MSG_4 to compse140.i
SUCCESS!
HTTP/1.1 200 OK
SUCCESS!
RUNNING
SUCCESS!
HTTP/1.1 201 Created
SUCCESS!
HTTP/1.1 201 Created
SUCCESS!
RUNNING
SUCCESS!
HTTP/1.1 200 OK
SUCCESS!
2022-11-24T15:39:34.414Z: RUNNING
SUCCESS!
Job succeeded
```

#### TODO: add deployment job log

![](https://i.imgur.com/ywF13qN_d.webp?maxwidth=760&fidelity=grand)

The different jobs in the CI pipeline

## 4. Reflection
The main things I learned during this project include better understanding of
a docker-compose orchestrated system and the use of GitLab CI. I was not
familiar with the latter and it caused the most trouble during development.

I used around 8 hours setting up the local GitLab and the Runner with
working configurations and around 20 hours for the rest of the project.
In total, around 28 hours were used.