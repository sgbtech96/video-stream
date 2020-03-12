const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sgbtech96:nptel@92@cluster0-hluvl.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("imgs");
  // perform actions on the collection object
  client.close();
});
