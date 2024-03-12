Хичээлийн бичлэг - https://youtu.be/MPzFrC1fK-Q


- Ubuntu 18 системтэй micro server үүсгэнэ
- **CloudWatchAgentServerPolicy** policy бүхий role үүсгэж үүсэсэн серверийн IAM Role дээр уяж өгнө.
- `apt update -y`
- `apt upgrade -y`
- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/download-cloudwatch-agent-commandline.html зааврын дагуу Cloudwatch Agent суулгана
- Ubuntu дээр дараах коммандаар суулгана:
- `wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb`
- `sudo apt install -f ./amazon-cloudwatch-agent.deb`
- **cloud-watch-agent-config.json** нэртэй файл үүсгэнэ. Дотор нь энэ фолдер дотор байгаа `cloud-watch-agent-config.json` нэртэй file-г хуулж тавина.
- `sudo amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:cloud-watch-agent-config.json` үүсгэсэн файл-г config дээр тохируулж Agent-г асаана.
- `sudo service amazon-cloudwatch-agent status` check status

CloudWatch Metric болон Logs-г үзээрэй. Log файл дээр текст нэмээд үз.

- `/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard` - Launch wizard
- `/opt/aws/amazon-cloudwatch-agent/bin/config.json` - Onprem config

7. Lambda event - 