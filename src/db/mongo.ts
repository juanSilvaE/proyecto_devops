import { MongoClient, Db } from "mongodb";
import { env } from "../config/env.js";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectMongo(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(env.mongo.uri);
  await client.connect();
  db = client.db(env.mongo.dbName);
  console.log("MongoDB connected");
  return db;
}

export function getMongoDb(): Db {
  if (!db) throw new Error("MongoDB is not connected. Call connectMongo() first.");
  return db;
}

export async function closeMongo(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
