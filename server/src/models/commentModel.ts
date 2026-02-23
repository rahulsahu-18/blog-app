import mongoose, { Mongoose, Schema } from "mongoose";
import { IComment } from "../types/blog.types"

const commentSchema = new Schema<IComment>({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog", required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });
const Comment = mongoose.model<IComment>("Comment",commentSchema);
export default Comment;