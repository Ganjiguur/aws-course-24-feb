# Даалгавар - EC2 IAM

## Хичээлийн линк - 

## Ажил 1 - IAM

Хичээлийн слайд дээр байгаа.


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
