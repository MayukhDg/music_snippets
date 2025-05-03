"use server";


import User from "@/database/models/user.schema";
import { connectToDatabase } from "@/database/connection";
import Snippet from "@/database/models/snippets.schema";
import mongoose from "mongoose";


interface CreateUserParams {
  clerkId: string,
      email: string;
      username: string;
      firstName?: string;
      lastName?: string;
      photo?: string;
}


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
  
      const user = await User.findOne({ clerkId }).populate({
        path:"uploadedSnippets",
        model:Snippet,
      }).populate({
        path:"downloadedSnippets",
        model:Snippet,
      });
      return user ? JSON.parse(JSON.stringify(user)) : null;
    } catch (error) {
      console.log(error);
    }
  }  

  export async function getUserById(userId: string) {
    try {
      await connectToDatabase();
  
      const user = await User.findById(userId).populate({
        path:"uploadedSnippets",
        model:Snippet,
      });
      return user ? JSON.parse(JSON.stringify(user)) : null;
    } catch (error) {
      console.log(error);
    }
  }  


  // export async function addtoDownloadedSnippets(userId: string, snippetId: string) {
  //   try {
  //     await connectToDatabase();

  //     await User.findByIdAndUpdate(
  //       userId,
  //       { $addToSet: { downloadedSnippets: new mongoose.Types.ObjectId(snippetId) } }
  //     );

  //     console.log("Snippet added to downloaded snippets successfully");
  //     return { success: true, snippetId };

  //   } catch (error:any) {
  //     console.error("Failed to add snippet:", error);
  //     return { success: false, error: error.message };
  //   }
  // }


  export async function addtoDownloadedSnippets(userId:string, snippetId:string) {
    try {
      await connectToDatabase();
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
  
      const snippetObjectId = new mongoose.Types.ObjectId(snippetId);
  
      const alreadyDownloaded = user.downloadedSnippets.some(
        (id:string) => id.toString() === snippetObjectId.toString()
      );
  
      if (!alreadyDownloaded) {
        user.downloadedSnippets.push(snippetObjectId);
        await user.save();
        console.log('Snippet added');
      } else {
        console.log('Snippet already downloaded');
      }
  
      return JSON.parse(JSON.stringify(user));
    } catch (err) {
      console.error('Error updating user downloads:', err);
    }
  }