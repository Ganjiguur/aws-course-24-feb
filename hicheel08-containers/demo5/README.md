```
package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
)

var counter int = 0

func main() {
	http.HandleFunc("/", index_handler)
	http.HandleFunc("/about", about_handler)
	http.HandleFunc("/crash", crash_handler)
	fmt.Println("Serving 8082...")
	http.ListenAndServe(":8082", nil)
}

func index_handler(w http.ResponseWriter, r *http.Request) {
	hostname, _ := os.Hostname()
	fmt.Fprintf(w, "Hello world, This is index Version: 1 \n\n")
	fmt.Fprintf(w, "Container ID: %s", hostname)
}

func about_handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "This is about page")
}

func crash_handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, strconv.Itoa(counter))
	counter = counter + 1
	if counter > 1000 {
		defer fmt.Println("!")
		os.Exit(3)
	}
}
// wrk -t6 -c10 -d30s http://localhost:8082/crash
```
Dockerfile
```
FROM golang:alpine as go_build
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
RUN go build -o gocrash .

# Stage 3: Build fresh container image without golang
FROM alpine
COPY --from=go_build /app/gocrash /bin/gocrash
EXPOSE 8082
ENTRYPOINT ["/bin/gocrash"]
```


*WRK  *
https://github.com/wg/wrk/wiki/Installing-wrk-on-Linux  
https://github.com/wg/wrk

*Docker visualizer*
`docker run -it -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer`

Docker hub push
```
docker login --username=yourhubusername --email=youremail@company.com
docker images
docker tag bb38976d03cf yourhubusername/verse_gapminder:firsttry
sudo docker push yourhubusername/verse_gapminder:v1

```

```
docker info # check swarm activated

docker swarm init --advertise-addr <ip-addr>  # Init docker swarm
# Then docker swarm join

docker service ls # list of all services
docker service ps <servicename> # List task of the service
docker service create --name <servicename> <imagename> # new service
docker service rm <servicename> # service remove
docker swarm leave # if manager add *--force* 

docker node ls # list of nodes
docker node ps # list nodes in services
docker node rm <nodeid>

docker node inspect <nodeid> --pretty # node-info

docker service create --name gocrash -p 80:8082 --mode global ganjiguur/gocrash:v1
docker service create --name gocrash -p 80:8082 --update-delay 3s --update-parallelism 2 --replicas 5 ganjiguur/gocrash:v1
docker service scale gocrash=7

docker node update --availability drain manager 

docker service update --image ganjiguur/goapp:v2 GoApp

```



```
#! /bin/bash
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo -y
sudo yum install docker-ce docker-ce-cli containerd.io -y
sudo usermod -aG docker $(whoami)
sudo systemctl start docker
sudo systemctl enable docker
sudo yum install git -y
sudo yum install epel-release
sudo yum install -y python-pip
sudo pip install docker-compose
```
https://docs.docker.com/install/linux/docker-ce/centos/  
`systemctl enable docker`  
`yum install git -y`

Docker compose - https://github.com/NaturalHistoryMuseum/scratchpads2/wiki/Install-Docker-and-Docker-Compose-(Centos-7)  



Example Voting App
=========
`docker-compose up`  
vote - localhost:5000  
result - localhost:5001

Architecture
-----

![Architecture diagram](https://s3-ap-southeast-1.amazonaws.com/fibo-resources/microservice.png)


##Docker stack  
`docker-stack.yml`  
`docker stack deploy -c docker-stack.yml gottalent`

![Architecture diagram](https://s3-ap-southeast-1.amazonaws.com/fibo-resources/cluster.png)
vote - 5  
redis - 3  
worker - 2  
db - 1