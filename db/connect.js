require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoConnectionString = process.env.MONGO_DB_STRING;

const client = new MongoClient(mongoConnectionString);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to database...");
    return client;
  } catch (error) {
    console.log("Unable to connect to Database...", error);
    process.exit(1);
  }
};

module.exports = { connectToDatabase, client };
