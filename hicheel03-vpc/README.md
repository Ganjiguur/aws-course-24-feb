# Даалгавар - VPC
## Хичээлийн линк - https://youtu.be/MNKWh0V2UWw

## Ажил 1 - VPC үүсгэх

 -  192.168.0.0/24 сүлжээтэй VPC сүлжээ үүсгэнэ. Дотор нь 4 тусдаа subnet үүсгэнэ (2 нь private /A,B/, 2 нь public /C,D/). Internet gateway. Routing table дээр мөн шаардлагатай тохиргоог хийнэ. Үр дүнд нь public subnet дотор үүссэн instance интернетээс хандалттай. private subnet дотор үүссэн instance интернетээс хандалтгүй боловч интернет рүү хандах боломжтой байдлаар зохион байгуулна.

Subnet 1 - 100 hosts
Subnet 2 - 60 hosts
Subnet 3 - 25 hosts
Subnet 4 - 20 hosts

1. Create a VPC
2. Create Subnets /different AZs/
Enable auto assign IPv4 for A public-subnet
Disable auto assign IPv4 for B public-subnet
3. Create Internet gateway and attach to VPC 
4. Create a public instance (Sec group - Allow ICMP - ping)
5. Create 2 route tables
6. Associate subnets on the route table
7. create Rules (0.0.0.0/0 -> Internet gateway)
8. Create a NAT gateway
9. Edit Private route table 
0.0.0.0/0 -> NAT gateway
10. Creata a private instance
11. SSH to private server through the public server
12. Check connectivity for private instance to access to the internet
13. NAT gateway-г NAT instance-р сольж үзнэ. - https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html#NATInstance

Server-үүд болон NAT gateway устгаарай. Мөн Elastic IP устгаарай. EC2 болон VPC dashboard-оос харж болно.

## Ажил 2 - VPC peering

- Default VPC болон шинээр үүсгэсэн VPC хоорондоо VPC peering тохируулах. (Peer connectivity)
- Нөгөө талдаа Peer connection accept хийх хэрэгтэй.
- 2 VPC route table дээр ip network хаягаар route бичиж өгнө.
- Security group болон NACL дээр блоклогдсон эсэхийг шалгах.
- 2 тусдаа VPC дотор үүссэн серверүүд ping шидэлцэх ёстой. Мөн private subnet дотор байгаа сервер-үүд мөн холбогдох ёстой.


## Ажил 3 - VPC endpoint: Private deer asaana, S3, IAM role, Route table, default region

Ажлын дараалал:
- NAT instance дээрх зааврын дагуу асаана. Public subnet дээр үүсгэнэ.
- Private route table дээр 0.0.0.0/0 сүлжээг NAT instance-рүү чиглүүлнэ.
- Private subnet дээр Amazon Linux 2 үйлдлийн системтэй сервер асаана. Bastion host-оор дамжуулж тухайн сервер лүү SSH орно.
- Шинээр үүсгэсэн сервер дээрээ IAM role өгнө. IAM role нь S3FullAccess permission policy байгаа эсэхийг шалгаарай. Өмнөх хичээлүүд дээр энэ талаар үзсэн.
- aws s3 ls - энэ командаар өөрийн AWS account дээр байгаа bucket list-г харж чадах ёстой.
- Route table дээр байгаа 0.0.0.0/0 to Nat-Instance энэ бичлэгийг устга. Ингэснээр манай сервер интернет рүү гарч чадахгүй болно.
- aws s3 ls - үүнийг дахин хийвэл үр дүн гарахгүй байх ёстой. Учир нь default-оор уг үйлдэл интернетээр дамжуулж хийгддэг.
- AWS Console дээр VPC сервис лүү орж Endpoints гэдэг цэсийг сонгоно.
- Create endpoints -> Нэр өгнө -> Category дээр AWS services сонгоно -> Хайлтын утга дээр s3 гэж бичээд com.amazonaws.ap-northeast-2.s3 иймэрхүү нэртэй гол нь Type=Gateway гэдгийг сонгоно.
- VPC хэсэгт өөрсдийн туршиж байгаа VPC сүлжээг сонгоно. Route table дээр өөрийн private route table-г сонгоно.
- Route table дээр цаанаасаа route орсон байх ёстой. Энийг устгаж болохгүй.
- aws s3 ls  энэ команд ажиллах ёстой.


# Нэмэлт материалууд
- https://aws.amazon.com/rds/faqs/
- https://cloud.netapp.com/blog/aws-cvo-blg-aws-rds-pricing-explained
- https://tutorialsdojo.com/amazon-vpc/
- https://tutorialsdojo.com/aws-direct-connect/
- https://tutorialsdojo.com/aws-transit-gateway/
- https://tutorialsdojo.com/vpc-peering/
- https://tutorialsdojo.com/amazon-aurora-vs-amazon-rds/