import { Request, Response } from "express";
import { Blog } from "../types";
import { imagekit } from "../config/imagekit.config";
import { blogModel } from "../models/blogModel";
import Comment from "../models/commentModel";

export const addBlog = async (req: Request, res: Response) => {
  try {
    const { title, subTitel, description, category, isPublished } =
      req.body as Blog;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const imageFile = req.file;
    if (
      !imageFile ||
      !subTitel ||
      !title ||
      !description ||
      !category ||
      !isPublished
    )
      return res
        .status(400)
        .json({ success: false, message: "missing required feilds" });

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/uploads",
    });
    const fileId = result.fileId;
    await blogModel.create({
      title,
      subTitel,
      description,
      category,
      image: result.url,
      isPublished,
      fileId
    });

    res
      .status(200)
      .json({ success: true, message: "blog created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: true, message: "error while blog created" });
  }
};

export const getAllBlog = async (req: Request, res: Response) => {
  try {
    const allBlog = await blogModel.find({ isPublished: true });
    return res.status(200).json({ success: true, allBlog });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "error while geting all blog" });
  }
};

export const getBlogbyId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res
        .status(400)
        .json({ message: "blog not found", success: false });
    }
    return res.status(200).json({ blog, success: false });
  } catch (error) {
    return res.status(200).json({ message: "blog not found", success: false });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(400).json({ message: "blog not found..", success: false });
    }
    await imagekit.deleteFile(blog.fileId!);

    //delete all comment asso with this blog 
    await Comment.deleteMany({blog:id});

    await blogModel.findByIdAndDelete(id);
    return res.status(400).json({ message: "delete successfull", success: false });
  } catch (error) {
    return res.status(400).json({ message: "error occourd while delete the blog", success: false });
  }
};

export const toggleIspublished = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(400).json({ message: "blog not found..", success: false });
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();
    return res.status(200).json({ message: "toggle successful", success: true });
  } catch (error) {
    return res.status(400).json({ message: "something went worng while toggle", success: false });
  }
}

export const addComment = async (req: Request, res: Response) => {
  const { blog, name, content } = req.body;
  try {
    await Comment.create({ blog, name, content });
    res.json({ message: "comment is added for review", success: true })
  } catch (error) {
    return res.status(400).json({ message: "something went worng while add comment", success: false });
  }
}

export const getBlogComments = async (req: Request, res: Response) => {
  const { blogId } = req.body;
  try {
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
    res.json({ comments, success: true })
  } catch (error) {
    return res.status(400).json({ message: "something went worng while getting all comment of a blog ", success: false });
  }
} 
