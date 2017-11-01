var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://sre-mac.local:27017/sample';

// Use connect method to connect to the server


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  //console.log("Connected successfully to server");
  console.log('collection', db);
  let collection = db.collection('tweets');
  console.log('collection', collection);
  db.close();


  // var findDocuments = function(db, callback) {
  //   console.log(db);
  //   // Get the documents collection
  //   //var collection = db.collection('tweets');
  //
  //   console.log(db.collection);
  //   // Find some documents
  //   // collection.find({}).toArray(function(err, docs) {
  //   //   assert.equal(err, null);
  //   //   console.log("Found the following records");
  //   //   console.log(docs)
  //   //   callback(docs);
  //   // });
  // }
  //
  // findDocuments(db, docs => { console.log(docs); });

  //console.log("Connected successfully to serversdgdegrdsf");






});
