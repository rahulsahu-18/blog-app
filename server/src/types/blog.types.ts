import { Types } from "mongoose"


export interface BlogTypes {
    title:string,
    subTitel:string,
    description:string,
    category:string,
    image:string,
    isPublished:boolean,
    fileId:string,
}

export interface Blog {
    title:string,
    subTitel:string,
    description:string,
    category:string,
    isPublished:boolean,
}

export interface IComment {
    blog:Types.ObjectId,
    name:string,
    content:string,
    isApproved:boolean,
    createdAt:Date,
    updatedAt:Date
}