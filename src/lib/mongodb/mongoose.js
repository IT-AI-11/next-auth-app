



import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connection Successful OK");
  } catch (error) {
    console.log(error);
  }
}





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