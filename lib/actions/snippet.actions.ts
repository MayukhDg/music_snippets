"use server"

import { connectToDatabase } from "@/database/connection"
import Snippet from "@/database/models/snippets.schema"
import User from "@/database/models/user.schema";


interface SnippetInput {
    title: string;
    content: string;
    author: string; // Added author property
    file: string; // Optional, if you want to include file upload functionality in the future
    price: number; // Added price property
}

interface SnippetOutput {
    title: string;
    content: string;
    author: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    file: string;
}

export const addSnippet = async (snippet: SnippetInput): Promise<SnippetOutput | undefined> => {
    try {
        await connectToDatabase();
        const newSnippet = await Snippet.create({
            title: snippet.title,
            content: snippet.content,
            author: snippet.author,
            file:snippet.file,
            price: snippet.price,
        });
        await newSnippet.save();
        await User.findByIdAndUpdate(snippet.author, {
            $push: { uploadedSnippets: newSnippet._id },
        });
        return JSON.parse(JSON.stringify(newSnippet)) as SnippetOutput;
        
    } catch (error) {
        console.error("Error adding snippet:", error);
    }
};


export async function fetchAllSnippets() {
    try {
        await connectToDatabase();
        const snippets = await Snippet.find({})
        return JSON.parse(JSON.stringify(snippets))
    } catch (error) {
        console.error("Error fetching snippets:", error);
    }
}


export async function searchSnippets({query, page, limit=3}: {query: string, page: number, limit?: number}) {
    try {
        
        if(!query) {
            return []
        }
        await connectToDatabase();
        const skipAmount = (Number(page) - 1) * limit
        const snippets = await Snippet.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
        
        const snippetsCount = await Snippet.countDocuments(({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        }))
        
        return {
           data: JSON.parse(JSON.stringify(snippets)),
           totalPages: Math.ceil(snippetsCount / limit),
        };
    } catch (error) {
        console.error('Error searching snippets:', error);
        throw error;
    }
}


export const fetchUserSnippets = async ({userId, page, limit =3 }: { userId: string; page?: number; limit?: number }) => {
    try {
        const skipAmount = (Number(page) - 1) * limit       
        await connectToDatabase();
        const snippets = await Snippet.find({ author: userId }).
        sort({ createdAt: 'desc' }).skip(skipAmount).limit(limit)
        const snippetsCount = await Snippet.countDocuments({ author: userId });
        return {
           data:JSON.parse(JSON.stringify(snippets)),
              totalPages: Math.ceil(snippetsCount / limit)
        };
    } catch (error) {
        console.error("Error fetching user snippets:", error);
    }
}
  