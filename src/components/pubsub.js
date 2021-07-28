import React, { useEffect, useState } from "react";
import axios from "axios";

function PubSubChat() {
  const [topicName, setTopicName] = useState("");
  const [subscriptionName, setSubscriptionName] = useState("");
  const [message, setMessage] = useState("")

  // useEffect(() => {
  //   axios.get("https://csci5410-backend.herokuapp.com/pubsub/receive/", {
  //     subscriptionName: "frontendtest-sub"
  //   }).then((response) => {
  //     console.log(response)
  //   });
  // }, []);

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

  const receiveMessage = () => {
    axios.get("https://csci5410-backend.herokuapp.com/pubsub/receive/" + subscriptionName).then((response) => {
      console.log(response)
    })
  }



  return (
    <div className="App">
      <div className="createTopic">
        <h1>Let's chat</h1>
        <label>Topic Name</label>
        <input type="text" onChange={(e) => { setTopicName(e.target.value); }}/>
        <button onClick={createTopic}>Create</button>
      </div>
      <div className="createSubscription">
        <label>Subscription Name</label>
        <input type="text" onChange={(e) => { setSubscriptionName(e.target.value); }}/>
        <button onClick={createSubscription}>Create</button>
      </div>
      <div className="publishMessage">
        <label>Publish Message</label>
        <input type="text" onChange={(e) => { setMessage(e.target.value); }}/>
        <button onClick={publishMessage}>Publish</button>
      </div>
      <div className="receiveMessage">
        <label>receive Message</label>
        <input type="text" onChange={(e) => { setSubscriptionName(e.target.value); }}/>
        <button onClick={receiveMessage}>Receive</button>
      </div>
    </div>
  );
}

export default PubSubChat;
