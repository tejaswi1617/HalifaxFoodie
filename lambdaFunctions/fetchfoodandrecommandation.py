import boto3
import json
import re
from difflib import SequenceMatcher
from boto3.dynamodb.conditions import Attr
def lambda_handler(event, context):
    print(event['body'])
    if (event):
        db = boto3.resource('dynamodb')
        orderTable = db.Table("userOrder")
        foodTable = db.Table("FoodItem")
        recommandation = []
        foodDataList = []
        userId = event['body']
        idlist = []
        order =  orderTable.scan(
        FilterExpression=Attr('userName').eq(userId)
        )
        print("User Order",order)
        food = foodTable.scan()
        
        orderData = order['Items']
        foodData = food['Items']
        for fooditem in foodData:
            fid = fooditem['foodId']
            fprice=fooditem['price']
            FoodData = {
                "foodName": fooditem['name'],
                "foodId":str(fid),
                "price":str(fprice),
                "ingredient":fooditem['ingredient']
            }
            foodDataList.append(FoodData)
            
        for orders in orderData:
            orderIngredients = orders['ingredient']
            orderIngredients = re.sub('\W+',' ', orderIngredients)
            for foods in foodData:
                foodIngredients = foods['ingredient']
                foodIngredients = re.sub('\W+',' ', foodIngredients)
                if (orders['foodId']!=foods['foodId']):
                    result = SequenceMatcher(None, orderIngredients, foodIngredients).ratio()
                    print(orderIngredients)
                    print(foodIngredients)
                    print(result)
                    if result > 0.65:
                        fId = foods['foodId']
                        price = foods['price']
                        data = {
                            'foodId':str(fId),
                            'foodName':foods['name'],
                            'price':str(price)
                        }
                        if(fId not in idlist):
                            recommandation.append(data)
                            idlist.append(fId)
                        
        print(recommandation)                            
        response = [{'recommandation':recommandation,'food':foodDataList}]
        print(response)
        return {
            'statusCode':200 ,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
            'body':json.dumps(response)
            }