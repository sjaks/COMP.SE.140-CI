# Documentation for the course project

```
$ uname -a; docker --version; docker-compose --version
Linux desktop 5.19.14-200.fc36.x86_64 #1 SMP PREEMPT_DYNAMIC Wed Oct 5 21:31:17 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
Docker version 20.10.21, build baeda1f
docker-compose version 1.29.2, build unknown
```

## 1. Instructions for the teaching assistant
Optional feature: Implement a static analysis step in the pipeline by using eslint 
  - The CI pipeline has a lint-test job that runs eslint for the source code using eslintrc config 

**Instructions for running the system locally:**
```
git clone -b project git@course-gitlab.tuni.fi:compse140-2022-2023/jakonens.git 
cd jakonens
docker-compose build –-no-cache
docker-compose up -d
./api/test/endpoints.sh # move to ./tests
```

### Implemented optional features

## 2. Description of the CI/CD pipeline
Briefly document all steps:
- Version management; use of branches etc
- Building tools
- Testing; tools and test cases
- Packing
- Deployment
- Operating; monitoring

## 3. Example runs of the pipeline
Failing and passing runs of the pipeline here

## 4. Reflection
Self reflection here
