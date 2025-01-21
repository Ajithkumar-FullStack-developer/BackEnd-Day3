const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; 
const dbname = "classDetails";
const client = new MongoClient(uri); 

module.exports = { client, dbname };
