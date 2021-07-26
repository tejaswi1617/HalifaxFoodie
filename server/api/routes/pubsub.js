const express = require('express')
const router = express.Router()
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();
require('dotenv').config(); 

router.post('/createTopic', async (req, res) => {
    const topicName = req.body.topicName
    try {
        await pubSubClient.createTopic(topicName);
        console.log(`Topic ${topicName} created.`);
        res.status(200).json({
            message: `Topic ${topicName} created.`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!",
        })
    }
})

router.post('/createSubscription', async (req, res) => {
    const { topicName, subscriptionName } = req.body;
    try {
        await pubSubClient.topic(topicName).createSubscription(subscriptionName);
        console.log(`Subscription ${subscriptionName} created.`);
        res.status(200).json({
            message: `Subscription ${subscriptionName} created.`
        })
    }catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!",
        })
    }
})

router.post('/publish', async (req, res) => {
    const { topicName, data } = req.body;
    const dataBuffer = Buffer.from(data);
    try {
        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
        res.status(200).json({
            message: `Message ${messageId} published.`
        })
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        res.status(500).json({
            message: "Something went wrong!",
        })
        process.exitCode = 1;
    }
})

router.get('/receive/:subscriptionName', async (req, res) => {
    const subscriptionName = req.params.subscriptionName;
    const timeout = 600;

    try {
        const subscription = pubSubClient.subscription(subscriptionName);
        const messageHandler = message => {
            console.log(`Data: ${message.data.toString()}`);
            message.ack();
            
        };
        subscription.on('message', messageHandler);

        setTimeout(() => {
            subscription.removeListener('message', messageHandler);
        }, timeout * 1000);
        res.status(200).json({
            message: "message received",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!",
            success: false
        })
    }
})

module.exports = router