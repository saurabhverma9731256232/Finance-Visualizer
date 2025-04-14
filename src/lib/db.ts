import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Use global type-safe caching to prevent hot-reload issues in development
const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};

export async function connectDB(): Promise<Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "finance_app",
    }).then((mongooseInstance) => mongooseInstance.connection);
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached; // Cache the connection globally
  return cached.conn;
}
