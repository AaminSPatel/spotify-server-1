const { MongoClient } = require("mongodb");
import dotenv from 'dotenv'
dotenv.config();

let uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    //const database = client.db("<dbName>");
    //const ratings = database.collection("<collName>");

    //const cursor = ratings.find();

   // await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
