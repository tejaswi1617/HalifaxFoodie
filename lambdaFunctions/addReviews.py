import json
import boto3
import random
import re
def lambda_handler(event, context):
    if (event):
        print(event)
        r1 = random.randint(10, 100000)
        db = boto3.resource('dynamodb')
        data= event['multiValueQueryStringParameters']
        review = data['ratings'][0]
        username=data['username'][0]
        stop_words = ['ourselves', 'hers', 'between', 'yourself', 'but', 'again', 'there', 'about', 'once', 'during', 'out',
                  'very', 'having',
                  'with', 'they', 'own', 'an', 'be', 'some', 'for', 'do', 'its', 'yours', 'such', 'into', 'of', 'most',
                  'itself', 'other', 'off', 'is', 's',
                  'am', 'or', 'who', 'as', 'from', 'him', 'each', 'the', 'themselves', 'until', 'below', 'are', 'we',
                  'these', 'your', 'his', 'through', 'don',
                  'nor', 'me', 'were', 'her', 'more', 'himself', 'this', 'down', 'should', 'our', 'their', 'while',
                  'above', 'both', 'up', 'to', 'ours', 'had',
                  'she', 'all', 'no', 'when', 'at', 'any', 'before', 'them', 'same', 'and', 'been', 'have', 'in',
                  'will', 'on', 'does', 'yourselves', 'then',
                  'that', 'because', 'what', 'over', 'why', 'so', 'can', 'did', 'not', 'now', 'under', 'he', 'you',
                  'herself', 'has', 'just', 'where', 'too',
                  'only', 'myself', 'which', 'those', 'i', 'after', 'few', 'whom', 't', 'being', 'if', 'theirs', 'my',
                  'against', 'a', 'by', 'doing', 'it',
                  'how', 'further', 'was', 'here', 'than']
              
        ratingTable = db.Table("ratings")
        if(len(review)!=0):
             resposne = ratingTable.put_item(
                Item={
                  'id':r1,    
                  'userName' :username,
                  'review':review
                })
        s3 = boto3.client('s3')
        worddataFile = s3.get_object(Bucket="wordclouds20", Key="listofwords.csv")
        words = worddataFile['Body'].read().decode('utf-8')
        wordNew = words.replace("\n", " ")
        reviews =  review.split(" ")  
        reviews_list = [r for r in reviews if not r in stop_words]
        for word in reviews_list:
            words = words + "\n"+ word
        s3.put_object(Bucket = 'wordclouds20', Key = "listofwords.csv" , Body = words)
        return {
            'statusCode': 200,
            'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                        },
            'body': json.dumps('Hello from Lambda!')
        }
