// mongo.ts
import mongoose, { Connection } from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Добавьте MONGO_URI в .env.local");
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

const cache: MongooseCache = { conn: null, promise: null };

export async function connectToDatabase(): Promise<Connection> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URI, {
      dbName: "wishlist",
      bufferCommands: false,
    }).then((mongoose) => mongoose.connection);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}