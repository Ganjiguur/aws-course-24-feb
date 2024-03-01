#!/bin/bash
yum update -y
yum install httpd -y
systemctl start httpd
systemctl enable httpd
EC2ID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)
EC2AZ=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)
echo '<html><h1>My EC2: INID    AZ: AZID</h1></html>' > /var/www/html/index.txt
sed -e "s/AZID/$EC2AZ/g" -e "s/INID/$EC2ID/g" /var/www/html/index.txt > /var/www/html/index.html