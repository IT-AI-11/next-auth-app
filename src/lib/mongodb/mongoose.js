



// import mongoose from "mongoose";

// export default async function connect() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log("MongoDB Connection Successful OK");
//   } catch (error) {
//     console.log(error);
//   }
// }







// import mongoose from 'mongoose';

// let initialized = false;

// export const connect = async () => {

//   mongoose.set('strictQuery', true);

//   if (initialized) {
//     console.log('MongoDB already connected');
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       dbName: 'next-auth-app',
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//     initialized = true;
//   } catch (error) {
//     console.log('MongoDB connection error:', error);
//   }
// };










// ДЛЯ СОЕДИНЕНИЯ С MongoDB
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("MongoDB successfully Connected !!!");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI, {
      dbName: "next-auth-app",
      bufferCommands: true,
    });
    console.log("Connected to MONGODB");
  } catch (err) {
    console.log("Error: ", err);
    throw new Error("Error: ", err);
  }
};

export default connect;