'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1"});
  const type = event.currentIntent.slots.FoodType
  const params = {
    TableName: 'restaurant',
  };
  
  try{
    const data = await documentClient.scan(params).promise();
    console.log(data.Items);
    data.Items.forEach(function(element, index, array) {
      if(element.foodType === type){
        callback(null, {
          "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
              "contentType": "PlainText",
              "content": "You can order food at " + element.name
            }
          }
        });
      }
    });
    
  }catch (err) {
    console.log(err);
  }
};