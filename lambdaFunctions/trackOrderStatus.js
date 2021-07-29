'use strict';
const AWS = require('aws-sdk')
const axios = require('axios')

exports.handler = async (event, context, callback) => {
    const id = event.currentIntent.slots.orderID
    await axios.get('https://wiktnapu90.execute-api.us-east-1.amazonaws.com/default/accessorder').then((response) => {
        response.data.forEach(function (element, index, array) {
            if (element.orderId === id) {
                console.log(element.status)
                callback(null, {
                    "dialogAction": {
                        "type": "Close",
                        "fulfillmentState": "Fulfilled",
                        "message": {
                            "contentType": "PlainText",
                            "content": "Status for order " + id + " is: " + element.status
                        }
                    }
                })
            }
        })
        callback(null, {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": "We cannot find your order. Please check your order id."
                }
            }
        })
    }).catch((err) => {
        console.log(err)
    })
}