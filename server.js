const express = require("express");
const tesseract = require('node-tesseract-ocr') // module which scan data from image 
const comprehend = require("comprehend");
const AWS = require('aws-sdk');

const app = express();
app.use(express.json());  
app.use(express.static(__dirname + '/'))


// app.get('/path', (req,res)=>{
//      res.sendFile(__dirname + "/fronted.html")
// })

app.get('/path',(req, res)=> {
    const config = {
        lang: 'eng',
        oem: 1,
        psm: 3
      }
    AWS.config.update({
        accessKeyId: "AKIAJX5MFR26KWUJF65A",
        secretAccessKey: "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",
        region: 'us-east-1'
      });
    var comprehend = new AWS.Comprehend();
    tesseract.recognize("/home/aijaj/Desktop/mathyalabs/visiting-cards/visiting-cards/card1.JPG",config)
    .then((data)=>{
        var params = {
            LanguageCode: 'en',
            TextList: [data]
          };
        comprehend.batchDetectEntities(params, function (err, data) {
            if (err){
                console.log(err, err.stack);     // an error occurred
            } 
            else{
                var inf=data.ResultList
                for (var i of inf){
                    console.log(i)
                    res.send(i)
                    
                }
                // console.log(data.ResultList);          // successful response
                // res.send(data.ResultList)
            }     
        });
    });
});

app.listen(3030, ()=>{
    console.log("server is listening on: 3030")
})

