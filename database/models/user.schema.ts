import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  uploadedSnippets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Snippet",
      default: [],
    },
  ],

  downloadedSnippets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Snippet",
      default: [],
    },
  ]
});

const User = models?.User || model("User", UserSchema);

export default User;