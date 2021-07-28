import React, { useState } from "react";
import axios from "axios";
import "./pubsub.css"

function PubSubChat() {
  const [topicName, setTopicName] = useState("");
  const [subscriptionName, setSubscriptionName] = useState("");
  const [message, setMessage] = useState("")
  const [data, setData] = useState([])

  const createTopic = () => {
    axios.post("https://csci5410-backend.herokuapp.com/pubsub/createTopic/", {
      topicName: topicName
    }).then((response) => {
      console.log(response)
    })
  }

  const createSubscription = () => {
    axios.post("https://csci5410-backend.herokuapp.com/pubsub/createSubscription/", {
      topicName: topicName,
      subscriptionName: subscriptionName
    }).then((response) => {
      console.log(response)
    })
  }

  const publishMessage = () => {
    axios.post("https://csci5410-backend.herokuapp.com/pubsub/publish/", {
      topicName: topicName,
      data: message
    }).then((response) => {
      console.log(response)
    })
  }

  const receiveMessage = async () => {
    axios.get("https://csci5410-backend.herokuapp.com/pubsub/receive/" + subscriptionName).then((response) => {
      setData(response.data)
      console.log(response)
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="App">
      <h1>Let's chat</h1>
      <div className="userOne">
        <label>Topic Name</label>
        <input type="text" onChange={(e) => { setTopicName(e.target.value); }} />
        <button onClick={createTopic}>Create</button>
        <label>Subscription Name</label>
        <input type="text" onChange={(e) => { setSubscriptionName(e.target.value); }} />
        <button onClick={createSubscription}>Create</button>
        <label>Publish Message</label>
        <input type="text" onChange={(e) => { setMessage(e.target.value); }} />
        <button onClick={publishMessage}>Publish</button>
        <label>receive Message</label>
        <input type="text" onChange={(e) => { setSubscriptionName(e.target.value); }} />
        <button onClick={receiveMessage}>Receive</button>
        <div className="message">{data}</div>
      </div>
      <div className="userTwo">
        <label>Topic Name</label>
        <input type="text" onChange={(e) => { setTopicName(e.target.value); }} />
        <button onClick={createTopic}>Create</button>
        <label>Subscription Name</label>
        <input type="text" onChange={(e) => { setSubscriptionName(e.target.value); }} />
        <button onClick={createSubscription}>Create</button>
        <label>Publish Message</label>
        <input type="text" onChange={(e) => { setMessage(e.target.value); }} />
        <button onClick={publishMessage}>Publish</button>
        <label>receive Message</label>
        <input type="text" onChange={(e) => { setSubscriptionName(e.target.value); }} />
        <button onClick={receiveMessage}>Receive</button>
        <div className="message">{data}</div>
      </div>
    </div>
  );
}

export default PubSubChat;
