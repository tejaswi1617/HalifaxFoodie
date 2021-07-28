import json
import boto3
import random
def lambda_handler(event, context):
   
    if (event):
        r1 = random.randint(10, 100000)
        db = boto3.resource('dynamodb')
        data = {}
        print(event['multiValueQueryStringParameters'])
        data= event['multiValueQueryStringParameters']
        
        foodName =data['foodName'][0]
        foodId = data['foodId'][0]
        userName = data['userName'][0]
        price = data['price'][0]
        ingredient = data['ingredient'][0]
        
        orderTable = db.Table("userOrder")
        if(len(data)!=0):
             resposne = orderTable.put_item(
                Item={
                  'name' :foodName,
                  'foodId':int(foodId),
                  'orderId': str(r1),
                  'userName':userName,
                  'Price':int(price),
                  'ingredient':ingredient,
                  'orderStatus':"Preparing"
                })
        
        print(resposne)
        return {
            'statusCode': 200,
            'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
            'body': json.dumps('Hello from Lambda!')
        }
