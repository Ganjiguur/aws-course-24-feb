# AWS Course - Lambda
### Доорх ойлголтуудыг нэгтгэж Text-to-Speech simple project хийх болно.

Хичээлийн бичлэг - https://youtu.be/g2ncYVqKr8Q

Дасгал бичлэг 1 - https://youtu.be/OlB_ha5lSjk
Дасгал бичлэг 2 - https://youtu.be/EwxGb5Cb6pk


- AWS Lambda
- Python programming language (AWS boto library)
- AWS S3 static web site hosting
- AWS API Gateway
- AWS Dynamo DB
- AWS Polly service

![](https://s3-ap-southeast-1.amazonaws.com/fibo-resources/hacknight1-topology.jpg)


### 2. Region сонгох

### 3. Create DynamoDB table
>**Table name:** texts
**primary key:** id (String) - Lowercase!

### 4. Create 2 buckets
Bucket name must be globally unique!
Өөрсдийн нэрээр нэрлэнэ үү.
- **Bucket #1**: aws-course-web  (web ажиллах bucket, domain холбох бол  **www.jiguur001.tk**)
- **Bucket #2**: aws-jiguur-mp3  (mp3 file хадгалах bucket)

>Make them public

### 5. Create a role for Lambda
#### 5.1. Create a policy
>**Name**: LambdaPolicyForAWSCourseMN
**Type**: JSON
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "polly:SynthesizeSpeech",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "sns:Publish",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetBucketLocation",
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

#### 5.2. Create a Role using policy
>**Name**: LambdaRoleForAWSCourseMN  
**Choose existing role**: LambdaPolicyForAWSCourseMN  
**Service**: Lambda

### 6. Create Lambda functions from scratch
#### 6.1. AWSCourseMN_NewText (Name)
**Зориулалт**
- Орж ирсэн текстийг DynamoDB лүү хадгална
- DynamoDB-с түүнийгээ select хийж Polly service ашиглан mp3 болгоно
- mp3 болгосон file-г S3 bucket дотор хадгална

>**Python 3.7**  
**Choose an existing role:** LambdaRoleForAWSCourseMN

Use the file name: **newtext.py**

- **Add environment variables**  
DB_TABLE_NAME: texts  
BUCKET_NAME: aws-course-mn-mp3 (Section 4 дээр өгсөн нэр)
- **Add description**
- **Set time-out to 5 mins**
- **Test Hello World**
```
{
    "voice": "Joanna",
    "text": "Hello Amazon Web Services Mongolia! This is AWS Course of FIBO Education"
}
```
- **Check DynamoDB table**

#### 6.2. AWSCourseMN_GetText (Name)
**Зориулалт:** DynamoDB-с утгуудыг query-дэнэ

>**Python 3.1**  
**Choose an existing role:** LambdaRoleForAWSCourseMN

Use the file name: **gettext.py**

- **Add environment variables**
DB_TABLE_NAME: texts
- **Add function description**
- **Set time-ut to 5 secs**
- **Test Hello World**
```
{
 	"postId": "*"
}
```

### 7. Create Rest API Gateway
**Name:** AWSCourseMNAPI

- Add GET Method
Integration type: Lambda function  
Target: **AWSCourseMN_GetText**  
Get request-ийн URL-с параметер авахын тулд Mapping хийж өгөх ёстой  
Integration request -> Body Mapping Templates -> When there are no templates defined -> application/json гэж бичиж оруулна
```
{
    "postId": "$input.params('postId')"
}
```

- Add POST Method
Integration type: Lambda function 
Target: **AWSCourseMN_NewText**

- Click Action -> Enable CORS -> Hit Enable CORS
- Deploy API 
Deployment stage: **[new stage]**
other fields all **prod**
- Click stage -> prod -> Invoke URL copy-дож авна

### 8. Replace API URL
scripts.js хамгийн дээр хуулна
### 9. Make static website hosting
Go to S3 and add 2 following files.
```
echo '<h1>Hello world</h1>' > index.html
```
>index.html
error.html

Add policy:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::REPLACE_BUCKET_NAME_HERE/*"
    }
  ]
}
```
Make public access on Access control list

Then try deleting **index.html**
### 10. Upload web files to our bucket
> index.html
scripts.js
styles.css

Select all show dummy data, then delete it from DynamoDB

### Extra S3, SSL, Domain name

1. Өөрийн домэйнээ холбож Route 53 дээр оруулж ирэх. bucket name must be same as domain name /N.Virginia/
2. Route53 - create a hosted zone 
3. Create cloudfront distribution with s3 bucket 
4. request certificate. <Your domain name>, validate with DNS, Create record set with Route53
5. Edit distribution with SSL certificate
6. edit Route53 a record route to Cloudfront

# Нэмэлт материалууд
- https://aws.amazon.com/serverless/
- https://aws.amazon.com/lambda/faqs/
- https://tutorialsdojo.com/aws-lambda/
- https://serverless-stack.com/