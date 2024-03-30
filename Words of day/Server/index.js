const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true });



const app = express();

app.get('/api/insert',(req,res)=>{
    const collection = client.db("Words").collection("Words");

    const y = collection.insertOne({word:req.query.q})
    if(y)
    res.status(200).send("Inserted");
    else
    res.status(400).send("Not Inserted");

})

app.get('/api/get',(req,res)=>{
    const collection = client.db("Words").collection("Words");
    collection.find({}).toArray(function(err, result) {
        if (err) throw err;
        res.status(200).send(result);
        console.log(result);
      });
}
)
app.listen(8001,()=>{console.log("Server is running")})