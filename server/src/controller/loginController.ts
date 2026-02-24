import jwt from 'jsonwebtoken'
import { AdminType } from "../types"
import type { Request, Response } from "express";
import { blogModel } from '../models/blogModel';
import Comment from '../models/commentModel';
export const login = async (req:Request,res:Response) => {
    const {email,password} = req.body as AdminType; 
    try {
        if(!email || !password)
            return res.status(401).json({success:false,message:"feilds cant be blank"});

        if(email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD)
            return res.status(401).json({success:false,message:"invalid cradencial !!"});
        
        const token = jwt.sign({email},process.env.JWT_SECRET!,{expiresIn:'7d'});

        res.cookie("token",token,{
            sameSite:'lax',
            maxAge:7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            secure:false,
        })
       return res.status(200).json({success:true,message:"admin logged in successfully"});
    } catch (error) {
        return res.status(401).json({success:false,message:"something went worgn in login"});
    }
}

export const getAllBlogsAdmin = async (req:Request,res:Response) =>{
  try {
    const blogs = await blogModel.find({}).sort({createdAt: -1});
    res.json({success: true, blogs})
  } catch (error) {
    res.json({success: false, message: "something went wrong while get all the blogs for admin"})
  }
}

export const getAllComments = async (req:Request,res:Response) =>{
  try {
    const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
    res.json({success: true, comments})
  } catch (error) {
    res.json({success: false, message: "something went wrong while get all comment for admin"})
  }
}

export const getDashboard = async (req:Request,res:Response) =>{
  try {
    const recentBlogs = await blogModel.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await blogModel.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await blogModel.countDocuments({isPublished: false});

    const dashboardData = {
      blogs, comments, drafts, recentBlogs
    }

    res.json({success: true, dashboardData})
  } catch (error) {
    res.json({success: false, message: "something went wrong while get all data fro dashboard"})
  }
}

export const deleteCommentById = async (req:Request,res:Response) =>{
  try {
    const {id} = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({success: true, message:"Comment deleted successfully" })
  } catch (error) {
    res.json({success: false, message: "something went wrong while delete comment by its id"})
  }
}

export const approveCommentById = async (req:Request,res:Response) =>{
  try {
    const {id} = req.params;
    await Comment.findByIdAndUpdate(id, {isApproved: true});
    res.json({success: true, message:"Comment approved successfully" })
  } catch (error) {
    res.json({success: false, message: "something went wrong while approved a comment"})
  }
}