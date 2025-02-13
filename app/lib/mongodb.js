// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGO_URI;
// const options = { useNewUrlParser: true, useUnifiedTopology: true };

// let client;
// let clientPromise;

// if (!process.env.MONGO_URI) {
//     throw new Error("Please add your Mongo URI to .env.local");
// }

// if (process.env.NODE_ENV === "development") {
//     // In development mode, use a global variable to preserve the client
//     if (!global._mongoClientPromise) {
//         client = new MongoClient(uri, options);
//         global._mongoClientPromise = client.connect();
//     }
//     clientPromise = global._mongoClientPromise;
// } else {
//     // In production mode, don't use a global variable
//     client = new MongoClient(uri, options);
//     clientPromise = client.connect();
// }

// export default clientPromise;



// This one works fine beofre product category issue
// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGO_URI; // Store the URI in .env.local

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable in .env.local');
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export default async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable in .env.local');
}

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictPopulate", false); // Add this line here

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
