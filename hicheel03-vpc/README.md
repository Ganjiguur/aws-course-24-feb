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

Дараагийн хичээл дээр цуг хийе.

# Нэмэлт материалууд
- https://aws.amazon.com/rds/faqs/
- https://cloud.netapp.com/blog/aws-cvo-blg-aws-rds-pricing-explained
- https://tutorialsdojo.com/amazon-vpc/
- https://tutorialsdojo.com/aws-direct-connect/
- https://tutorialsdojo.com/aws-transit-gateway/
- https://tutorialsdojo.com/vpc-peering/
- https://tutorialsdojo.com/amazon-aurora-vs-amazon-rds/