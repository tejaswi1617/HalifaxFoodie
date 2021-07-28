const express = require('express')
const router = express.Router()
var axios = require("axios").default;

router.post('/data', async (req, res) => {
    console.log("hello",req.body)

var options = {
    method: 'POST',
    url: 'https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-key': 'a5b09530d4msh6aa9923bbf2cd29p131884jsn26d47a088af5',
      'x-rapidapi-host': 'textvis-word-cloud-v1.p.rapidapi.com'
    },
    data: {
      text: req.body.text,
      scale: 0.5,
      width: 1000,
      height: 1000,
      colors: ['#375E97', '#FB6542', '#FFBB00', '#3F681C'],
      font: 'Tahoma',
      use_stopwords: true,
      language: 'en',
      uppercase: false
    }
  };
  
  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
      console.error(error);
  });
})
module.exports = router