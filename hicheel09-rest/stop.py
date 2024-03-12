import json
import boto3

ec2 = boto3.resource('ec2', region_name='ap-southeast-1')
rds = boto3.client('rds')

def lambda_handler(event, context):
    instances = ec2.instances.filter(Filters=[{'Name': 'instance-state-name', 'Values': ['running']},{'Name': 'tag:Type','Values':['Server']}])
    result_message = ""
    for instance in instances:
         id=instance.id
         ec2.instances.filter(InstanceIds=[id]).stop()
         result_message += "Instance ID is stopped: " + instance.id + '        '

    response = rds.describe_db_instances()
    for i in response['DBInstances']:
        if i['DBInstanceIdentifier'] == 'aidot-mysql':
            if i['DBInstanceStatus'] == 'available':
                rds.stop_db_instance(DBInstanceIdentifier='aidot-mysql')
                result_message += "RDS is stopping. "
            else:
                result_message += "RDS is not in running state."
                
    return {
        'statusCode': 200,
        'body': json.dumps(result_message)
    }