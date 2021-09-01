import json
import boto3

def lambda_handler(event, context):
    print(event)
    if(event):
        db = boto3.resource('dynamodb')
        orderTable = db.Table("userOrder")
        order =  orderTable.scan()
        orderData = order['Items']
        orderDataList = []

        for orderitem in orderData:
            
            oId=orderitem['orderId']
            fid = orderitem['foodId']
            fprice=orderitem['Price']
            orderData = {
                "orderId":str(oId),
                "foodName": orderitem['name'],
                "foodId":str(fid),
                "price":str(fprice),
                "ingredient":orderitem['ingredient'],
                "userName":orderitem['userName'],
                "status":orderitem['orderStatus']
            }
            
            orderDataList.append(orderData)
        return {
            'statusCode': 200,
            'body': json.dumps(orderDataList)
        }
