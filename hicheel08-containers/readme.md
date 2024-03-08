# Даалгавар 1
1.  MySQL or MariaDB instance public network дээр үүсгэнэ.
2.  Өөрийн PC-ээс хандаж эхлэл Database болон Table row үүсгэнэ.
3.  Түүнийгээ Snapshot авч хадгалаад түүнээсээ дамжуулж Private Zone-д шинэ DB instance үүсгэнэ.
4.  Холбогдох port-уудыг зөвхөн 1 instance-н байгаа security group-г зөвшөөрнө.
5.  Web server дээрээ Database-с мөр уншиж дэлгэцлэх веб асаана. Жишээ кодыг оруулав. (Dockerfile болон PHP код)
6.  Database instance дээр automatic snapshot болон бусад анги дээр туршсан тохиргоонуудыг туршиж үзэх.
    
    Docker веб 8081-р порт дээр асаах комманд

		  docker run -p 8081:80 --env DB_HOST={db-endpoint} --env DB_USER={db-admin} --env DB_PASS={db-pass} --env DB_NAME={db-name} --env TABLE={table-name} {image-name}


# Нэмэлт материалууд
- https://aws.amazon.com/rds/faqs/
- https://aws.amazon.com/rds/pricing/
- https://tutorialsdojo.com/amazon-relational-database-service-amazon-rds/
- https://tutorialsdojo.com/amazon-aurora/
- https://tutorialsdojo.com/amazon-dynamodb/
- https://tutorialsdojo.com/amazon-elasticache/
- https://tutorialsdojo.com/amazon-redshift/
- https://tutorialsdojo.com/amazon-documentdb/
- https://tutorialsdojo.com/amazon-neptune/
- https://tutorialsdojo.com/amazon-quantum-ledger-database-qldb/

# Даалгавар 2

Amazon linux 2 image
bootstrap script

```
#!/bin/bash
sudo yum update -y
sudo yum search docker
sudo yum install docker -y
sudo usermod -a -G docker ec2-user
id ec2-user
newgrp docker
sudo yum install python3-pip
sudo pip3 install docker-compose 
sudo systemctl enable docker.service
sudo systemctl start docker.service
sudo yum install git -y
```


# Нэмэлт
- https://docs.docker.com/get-started/
- https://www.tutorialspoint.com/docker/index.htm
