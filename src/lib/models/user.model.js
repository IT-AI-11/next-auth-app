


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // clerkId это id-шник из clerk конкретного пользователя при его регистрации в Clerk
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema); // 'User' это название collection в MongoDB

export default User;