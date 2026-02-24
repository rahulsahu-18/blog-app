import express from 'express'
import { upload } from '../middleware/multer';
import { addBlog, addComment, deleteBlog, getAllBlog, getBlogbyId, getBlogComments, toggleIspublished } from '../controller/blogController';
import { auth } from '../middleware/auth';

const blogRouter = express.Router();

blogRouter.post('/addblog',upload.single('image'),auth,addBlog);
blogRouter.get('/getAllBlog',getAllBlog);
blogRouter.delete('/deleteOne/:id',auth,deleteBlog);
blogRouter.post('/toggle/:id',auth,toggleIspublished);
blogRouter.get('/getOneBlog/:id',getBlogbyId);

blogRouter.post('/add-comment',addComment);
blogRouter.get('/comments/:blogId',getBlogComments);

export default blogRouter;