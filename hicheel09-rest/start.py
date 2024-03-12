import json
import boto3

ec2 = boto3.resource('ec2', region_name='ap-southeast-1')
rds = boto3.client('rds')

def lambda_handler(event, context):
        
    instances = ec2.instances.filter(Filters=[{'Name': 'instance-state-name', 'Values': ['stopped']},{'Name': 'tag:Project','Values':['Aidot']}])
    result_message = ""
    for instance in instances:
         id=instance.id
         ec2.instances.filter(InstanceIds=[id]).start()
         result_message += "Instance ID is started : " + instance.id + '        '
         
    #response = rds.describe_db_instances()
    #for i in response['DBInstances']:
    #    if i['DBInstanceIdentifier'] == 'aidot-mysql':
    #        if i['DBInstanceStatus'] == 'stopped':
    #            rds.start_db_instance(DBInstanceIdentifier='aidot-mysql')
    #            result_message += "   RDS is starting. "
    #        else:
    #            result_message += "   RDS is not in stopped state."
         
    return {
        'statusCode': 200,
        'body': json.dumps(result_message)
    }