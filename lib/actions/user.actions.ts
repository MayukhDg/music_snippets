"use server";


import User from "@/database/models/user.schema";
import { connectToDatabase } from "@/database/connection";



export async function createUser(user: CreateUserParams) {
    try {
      await connectToDatabase();
  
      const newUser = await User.create(user);
  
      return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
      console.log(error);
    }
  }
  

  export async function deleteUser(clerkId: string) {
    try {
      await connectToDatabase();
  
      // Find user to delete
      const userToDelete = await User.findOne({ clerkId });
  
      if (!userToDelete) {
        throw new Error("User not found");
      }
  
      // Delete user
      const deletedUser = await User.findByIdAndDelete(userToDelete._id);
      
  
      return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
      console.log(error);
    }
  }


  export async function getUserByClerkId(clerkId: string) {
    try {
      await connectToDatabase();
  
      const user = await User.findOne({ clerkId });
      return user ? JSON.parse(JSON.stringify(user)) : null;
    } catch (error) {
      console.log(error);
    }
  }  
