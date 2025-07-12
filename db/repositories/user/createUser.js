const { client } = require("../../connect");

const collection = client.db("jobs").collection("users");

const createUser = async (document) => {
  try {
    const result = await collection.insertOne(document);
    return result;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

module.exports = createUser;
