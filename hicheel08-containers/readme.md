Хичээлийн линк - https://youtu.be/L1GHpJ6MrMs


# Даалгавар

Ubuntu 22 - EC2 
bootstrap script

```
#!/bin/bash
# Install docker
apt-get update
apt-get install -y cloud-utils apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update
apt-get install -y docker-ce
usermod -aG docker ubuntu

# Install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```


# Нэмэлт
- https://docs.docker.com/get-started/
- https://www.tutorialspoint.com/docker/index.htm
