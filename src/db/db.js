import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const mongoClient = new MongoClient(process.env.DATABASE_URL);

const setConnection = async () => {
  try {
    await mongoClient.connect();
    return mongoClient.db();
  } catch (error) {
    console.log(error);
  }
};

const db = await setConnection();

export default db;