# Даалгавар - RDS
## Хичээлийн линк 
## Даалгаврын линк

## Route 53

## Ажил 1 - Domain холбох
namecheap дээрээс авсан домэйнээ AWS route 53 дээр оруулж ирэх 
## Ажил 2 - Routing policy-ууд турших.
2 өөр region дээр 2 тусдаа сервер үүсгэж 80 порт дээр вебсайт асаах. Өмнөх хичээлийн user-data-г ашиглаж болно.
Доорх routing policy-уудыг турших

- Simple routing
- Weighted routing
- Failover routing*
- Geolocation routing
- Multi-answer routing*

Ингэхдээ Health check үүсгэх тохиолдол (*) байна шүү.

## Ажил 3 - Certificate manager service-ээр SSL авах 

Route 53-р баталгаажуулалт хийх.
Load balancer + Target group дээр тохиргоо хийх.

1. Target group дээрээ веб асаасан серверээ оруулж ирэх.
2. Load balancer асаана. (Target group болон Load balancer нь бүгд ижилхэн VPC болон Availability Zone байхыг анхаарна уу.)
3. 80-р порт бол SSL 443 лүү redirect буцаана.
4. 443 порт нь target group лүүгээ заана. Ингэхдээ үүсгэсэн SSL-ээ оруулж ирнэ. (SSL нь адилхан region байх ёстой.)
5. Route 53 дээрээ Alias дээрээ тухайн load balancer-г онилж оруулж ирнэ.


## RDS + Website

1.  MySQL or MariaDB instance public network дээр үүсгэнэ.
2.  Өөрийн PC-ээс хандаж эхлэл Database болон Table row үүсгэнэ. DBeaver tool ашиглана. https://dbeaver.io/
3.  Түүнийгээ Snapshot авч хадгалаад түүнээсээ дамжуулж Private Zone-д шинэ DB instance үүсгэнэ. Түүний өмнө subnet group үүсгэх ёстойг анхаарна уу.
4.  DB ассан байгаа security group-г зөвхөн 3306 port-оор веб сервер асаах буюу public-subnet-д байгаа security group-г зөвшөөрнө.
5.  Web server дээрээ Database-с мөр уншиж дэлгэцлэх веб асаана. Жишээ кодыг оруулав. (Dockerfile болон PHP код)
    
    `docker build -t my-php-web .`
    
    Docker веб 8081-р порт дээр асаах комманд
        
		  `docker run -p 8081:8080 --env DB_HOST={db-endpoint} --env DB_USER={db-admin} --env DB_PASS={db-pass} --env DB_NAME={db-name} --env TABLE={table-name} {image-name}`

          

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