import json
import boto3
import re
def lambda_handler(event, context):
    # TODO implement
    s3 = boto3.client('s3')
    reviewsWords = s3.get_object(Bucket="wordclouds20", Key="listofwords.csv")
    words = reviewsWords['Body'].read().decode('utf-8')
    words = re.sub(r'\W+', ' ',   words) 
    return {
        'statusCode': 200,
        'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                        },
        'body': json.dumps(words)
    }
