import mongoose, { Schema, Document } from 'mongoose';

export interface ISnippet extends Document {
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

const SnippetSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        file: { type: String, required: true },
        price: { type: Number, required: true },
        downloadCount: { type: Number },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Snippet = mongoose.models?.Snippet || mongoose.model('Snippet', SnippetSchema);

export default Snippet;