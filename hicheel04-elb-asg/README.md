# Даалгавар - ELB , ASG
## Хичээлийн линк - https://youtu.be/Fcls7dvMxzw

## Ажил 1
1. 2 өөр AZ дээр сервер үүсгэхдээ `user-data.sh` байгаа script-г user-data дотор хуулаарай. User-data type дээр v1 гэснийг сонгоно. Бичлэг дээрээс харах.
2. Elastic Load Balancer - Application Load balancer үүсгэж 2 серверээ холбоно. Ингэхдээ Target group үүсгэнэ гэдгийг санаарай. Target group үүсгэх үед 2 сервер үүсгэдгийг анхаарна уу.
3. Load balancer DNS-ээр 2 сервер лүүгээ хандана. Мөн бүх тохиргоонуудыг гүйлгэж харах.
4. Target group дээр байгаа health check-г өөрчлөөд мөн үүсгэсэн нэг серверээ унтраагаад / SSH-r ороод сервис зогсоогоод үзээрэй.
5. Бичлэгийг дахиж заавал үзээрэй. Мөн алдаа гарах магадлал их учраас яг ямар тохиргоо буруу хийснийг мөрдөж харах
6. Үүссэн resource-уудаа устгах шаардлгатай шүү.
## Ажил 2
1. Auto scaling group үүсгэж, Scaling policy тохируулаарай. 
2. Түүний өмнө Launch template гэдэг зүйо үүсгэнэ. User-data ашиглана.
3. Scaling policy тохируулах. CPU > 30%
4. `stress-install.sh` гэдгээр програм суулгаж зохиомол стресс үүсгээрэй. `stress --cpu 8 --timeout 600s`
5. Туршилтууд явагдаж дууссаны дараа Auto Scaling group-г устгах шаардлагатай.

# Нэмэлт материал
- https://aws.amazon.com/elasticloadbalancing/faqs/
- https://aws.amazon.com/elasticloadbalancing/pricing/
- https://tutorialsdojo.com/application-load-balancer-vs-network-load-balancer-vs-classic-load-balancer/
- https://tutorialsdojo.com/aws-elastic-load-balancing-elb/