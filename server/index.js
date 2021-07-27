const express = require("express");
const app = express();
const cors = require('cors')
//const path = require("path")
const port = process.env.PORT || 5000;

const pubsubRoute = require('./api/routes/pubsub')


app.use(cors())
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json())
//app.use(express.static(path.join(__dirname, "client", "build")))

app.use("/pubsub", pubsubRoute)
app.use("/wordcloud", wordcloudRoute)

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(port, () => {
    console.log("Server is running on " + port);
})

