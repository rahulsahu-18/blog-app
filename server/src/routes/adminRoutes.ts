import express from 'express'
import { approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard, login } from '../controller/loginController';
import { auth } from '../middleware/auth';

const adminRoutes = express.Router();

adminRoutes.post('/login',login);
adminRoutes.get("/comments", auth, getAllComments);
adminRoutes.get("/blogs", auth, getAllBlogsAdmin);
adminRoutes.post("/delete-comment", auth, deleteCommentById);
adminRoutes.post("/approve-comment/:id", auth, approveCommentById);
adminRoutes.get("/dashboard", auth, getDashboard);
export default adminRoutes;