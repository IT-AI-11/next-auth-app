


import User from "../models/user.model";
//import { connect } from '../mongodb/mongoose';
import { connect } from "../mongodb/mongoose";


// пойдет в api/webhooks/route.js
export const createOrUpdateUser = async (
    // это приходит из Clerk: Configure > Webhooks > Event Catalog > Event Types > user > user.created > Example Email created event
    id,
    first_name,
    last_name,
    image_url,
    email_addresses,
    username
  ) => {
    try {

      // соединение с MongoDB из lib/mongodb/mongoose.js  
      await connect();
  
      // это приходит из Schema/model "User" lib/models/user.model.js
      const user = await User.findOneAndUpdate(
        { clerkId: id }, // из Schema "User": из_Clerk  
        {
          //  $set: проверяет в MongoDB какую часть обновить
          $set: {
            firstName: first_name, // из Schema "User": из_Clerk 
            lastName: last_name, // из Schema "User": из_Clerk 
            avatar: image_url, // из Schema "User": из_Clerk 
            email: email_addresses[0].email, // из Schema "User": из_Clerk 
            username: username, // из Schema "User": из_Clerk  
          },
        },
        { new: true, upsert: true }
      );
  
      return user;

    } catch (error) {
      console.log('Error creating or updating user 999:', error);
    }
  };
  


  // пойдет в api/webhooks/route.js
  export const deleteUser = async (id) => {
    try {

      await connect();
  
      await User.findOneAndDelete({ clerkId: id }); // этот id из Clerk берется через Schema "User" clerkId

    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };