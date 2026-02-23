import express from 'express'
import { upload } from '../middleware/multer';
import { addBlog, addComment, deleteBlog, getAllBlog, getBlogbyId, getBlogComments, toggleIspublished } from '../controller/blogController';
import { auth } from '../middleware/auth';

const blogRouter = express.Router();

blogRouter.post('/addblog',upload.single('image'),auth,addBlog);
blogRouter.get('/getAllBlog',auth,getAllBlog);
blogRouter.delete('/deleteOne/:id',auth,deleteBlog);
blogRouter.post('/toggle/:id',auth,toggleIspublished);
blogRouter.get('/getOneBlog/:id',auth,getBlogbyId);

blogRouter.post('/add-comment',addComment);
blogRouter.post('/comments',getBlogComments);

export default blogRouter;