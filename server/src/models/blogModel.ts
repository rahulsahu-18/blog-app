import mongoose from "mongoose";
import { BlogTypes } from "../types";

const blogSchema = new mongoose.Schema<BlogTypes>({
    title:{type:String,required:true},
    subTitle:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    isPublished:{type:Boolean,required:true},
    fileId:{type:String,required:true},
},{timestamps:true});

export const blogModel = mongoose.model<BlogTypes>("blog",blogSchema);