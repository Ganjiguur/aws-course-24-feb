on master

`docker swarm init`

Security group - Allow all trafic!

other nodes
`docker swarm join ......`





##Docker stack  
`docker-stack.yml`  
`docker stack deploy -c docker-stack.yml gottalent`

```
docker service ls # list of all services
docker service ps <servicename> # List task of the service
docker service create <servicename> <imagename> # shine service uusgeh
docker service rm <servicename> # service ustgah
docker service scale <servicename>=6 # service-g scale hiih
docker swarm leave # swarm-s garah hervee manager garah bol *--force* gej nemne

docker node ls # list of nodes
docker node ps # list nodes in services
docker node rm <nodeid>

docker node inspect <nodeid> --pretty # node-info

```

![Architecture diagram](https://s3-ap-southeast-1.amazonaws.com/fibo-resources/cluster.png)
vote - 5  
redis - 3  
worker - 2  
db - 1