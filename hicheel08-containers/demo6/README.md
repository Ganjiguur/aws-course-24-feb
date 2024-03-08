demo 5 дээр хийсэн images-ээ docker hub ruu push hii


Docker hub push
```
docker login --username=yourhubusername --email=youremail@company.com
docker images
docker tag bb38976d03cf yourhubusername/verse_gapminder:firsttry
sudo docker push yourhubusername/verse_gapminder:v1

```

##Docker stack  
`docker-stack.yml`  
`docker stack deploy -c docker-stack.yml gottalent`

![Architecture diagram](https://s3-ap-southeast-1.amazonaws.com/fibo-resources/cluster.png)
vote - 5  
redis - 3  
worker - 2  
db - 1