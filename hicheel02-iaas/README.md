# Даалгавар - EC2 IAM

## Хичээлийн линк - 

## Ажил 1 - IAM

## Ажил 1 - IAM, User, Group

1. admin, user1, user2, user3 гэсэн 4  User үүсгэнэ
2.  S3-Support, EC2-Support, EC2-Admin гэсэн 3  User group үүсгэнэ.
3.  admin хэрэглэгчид Administrator permission policy өгнө.
4.  User Group тус бүрт дараах эрхүүдийг өгнө:

    1.  S3-Support -> AmazonS3ReadOnlyAccess
    2.  EC2-Support -> AmazonEC2ReadOnlyAccess
    3.  EC2-Admin -> Шинэ custom policy үүсгэж дараах эрхийг олгоно. [https://gist.github.com/Ganjiguur/7d5c95448ba21abb88ca6c3d76bf82bb](https://gist.github.com/Ganjiguur/7d5c95448ba21abb88ca6c3d76bf82bb)

		       {
		        "Version": "2012-10-17",
		        "Statement": [
		            {
		                "Action": "ec2:*",
		                "Effect": "Allow",
		                "Resource": "*"
		            },
		            {
		                "Effect": "Allow",
		                "Action": "elasticloadbalancing:*",
		                "Resource": "*"
		            },
		            {
		                "Effect": "Allow",
		                "Action": "cloudwatch:*",
		                "Resource": "*"
		            },
		            {
		                "Effect": "Allow",
		                "Action": "autoscaling:*",
		                "Resource": "*"
		            },
		            {
		                "Effect": "Allow",
		                "Action": "iam:CreateServiceLinkedRole",
		                "Resource": "*",
		                "Condition": {
		                    "StringEquals": {
		                        "iam:AWSServiceName": [
		                            "autoscaling.amazonaws.com",
		                            "ec2scheduled.amazonaws.com",
		                            "elasticloadbalancing.amazonaws.com",
		                            "spot.amazonaws.com",
		                            "spotfleet.amazonaws.com",
		                            "transitgateway.amazonaws.com"
		                        ]
		                    }
		                }
		            }
		        ]
		    }

 5.  Үүсгэсэн хэрэглэгчдийг тус тусын групп лүү оруулна:
    
|User     |In Group          |Permissions               |
|---------|-----------------|----------------------------------------------------|
|user-1  |S3-Support     |Read-Only access to Amazon S3                    |
|user-2  |EC2-Support  |Read-Only access to Amazon EC2                  |
|user-3  |EC-Admin       |View, Start and Stop Amazon EC2 instances |

6. Admin хэрэглэгчээр нэвтэрч S3 bucket болон EC2 micro хэмжээтэй сервер үүсгэнэ.

7. user1-ээр нэвтэрч ороод:

		а. S3 цэс рүү орж үзнэ. Үйлдэл хийнэ (Шинэ bucket үүсгэх г.м.)

		b. EC2 цэс рүү орж үзнэ. Үйлдэл хийнэ (Шинэ server үүсгэх г.м.)

8. user2-р нэвтэрч ороод:

		а. S3 цэс рүү орж үзнэ. Үйлдэл хийнэ (Шинэ bucket үүсгэх г.м.)

		b. EC2 цэс рүү орж үзнэ. Үйлдэл хийнэ (Шинэ server үүсгэх г.м.)

		c. Server унтраах гэж оролд

9. user3-р нэвтэрч ороод:

		а. S3 цэс рүү орж үзнэ. Үйлдэл хийнэ (Шинэ bucket үүсгэх г.м.)

		b. EC2 цэс рүү орж үзнэ. Үйлдэл хийнэ (Шинэ server үүсгэх г.м.)

		c. Server унтраах гэж оролд

10. Admin-аар ороод User group permission-г өөрчлөөд үз.

11. 6, 7, 8 дээр бичигдсэн үйлдлүүдийг давтаж хий.

12. Үүсгэсэн бүх resource-уудаа цэвэрлэх.

		1.  Users
		2.  User-groups   
		3.  S3 bucket
		4.  EC2 server


## Ажил 2 - Billing alarm

https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html 


## Ажил 3-1 - Сервер үүсгэх
Fixed IP бүхий 2 сервер үүсгэнэ. (micro хэмжээтэй сервер үүсгээрэй)
1.  Windows
2.  Linux

- Сервер лүүгээ файл хуул
- Серверээсээ файл өөрийн ком луугаа хуул
- Тус бүрт нь 80 порт дээр ямар нэг веб асаа
- Үүсгэсэн серверийн өөр AZ болон Region дээр clone-дож асаа

scp командаар хуулдаг шүү - Заавар - https://linuxize.com/post/how-to-use-scp-command-to-securely-transfer-files/

File Zilla client програм суулгаж бас болно - https://www.youtube.com/watch?v=wP-JwpAbxX8

## Ажил 3-2 - Диск холбох
2 серверийн үйлдлийн систем ажиллаж буй (Boot) Volume-н
-   Хэмжээг нэмэгдүүлэх 
-   Шинэ Volume үүсгэж түүнийгээ сервертэй холбох

Хард дискүүдээ систем дээр оруулж ирэх хэрэгтэй шүү

Заавар - Хэмжээ нэмэгдүүлэх - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html

Заавар - Дикс залгах - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html


## Ажил 3-3 - SSH түлхүүр

Үүсгэсэн линукс серверийн private key алга болгосон тохиолдолд EC2 серверийн хандалтаа хэрхэн эргүүлж олж авах вэ?
**2 аргаар орж болно:**
1. Snapshot аваад сэргээх
2. SSH public key-г replace хийх


Үүсгэж буй сервер нь ижилхэн AZ-д байх ёстой шүү.

Доорх командаар дискийг салгаж Public key файлыг өөрчилнө.
```
lsblk -f
mkdir /mnt/tempvol
mount /dev/xvdf1 /mnt/tempvol
lsblk -f
ls -lah /mnt/tempvol
cp .ssh/authorized_key /mnt/tempvol/home/ec2-user/.ssh/   (Энэ дээр user home directory нэр нь өөр байдаг шүү. ubuntu, centos ч юмуу)
sudo umount /mnt/tempvol
lsblk -f
```

# Нэмэлт материалууд

- https://aws.amazon.com/ec2/faqs/
- https://aws.amazon.com/ec2/pricing/
- https://www.concurrencylabs.com/blog/choose-your-aws-region-wisely/
- https://tutorialsdojo.com/amazon-elastic-compute-cloud-amazon-ec2/
- https://tutorialsdojo.com/amazon-ebs/
- https://tutorialsdojo.com/amazon-efs/
