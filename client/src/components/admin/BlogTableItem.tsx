import { assets } from "@/assets/assets";
import { useDeleteBlogMutation, useTogglePublishMutation } from "@/store/slice/api";
import type { Blog } from "@/vite-env";
import toast from "react-hot-toast";

interface BlogTableItemProps {
  Blog: Blog;
  fetchBlogs: () => void;
  index: number;
}

function BlogTableItem({ Blog, index, fetchBlogs }: BlogTableItemProps) {
  const { title, createdAt, isPublished,_id } = Blog;
  const blogDate = new Date(createdAt);
  const [deleteBlog] = useDeleteBlogMutation();
  const [togglePublish] = useTogglePublishMutation(); 
const handleDelete = async (blogId:string)=> {
  try {
    const result = await deleteBlog(blogId).unwrap();
    toast.success(result.message);
  } catch (error) {
    toast.success("something went worng while delete the blog");
  }
}
const handlePublish = async (blogId:string)=>{
   try {
    const result = await togglePublish(blogId).unwrap();
    toast.success(result.message);
   } catch (error) {
    toast.error('something went worng');
   }
}


  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p className={`${isPublished ? "text-green-600" : "text-orange-700"}`}>
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer" onClick={()=>handlePublish(_id)}>
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          className="w-8 hover: scale-110 transition-all
cursor-pointer"
          alt=""
          onClick={()=>handleDelete(_id)}
        />
      </td>
    </tr>
  );
}

export default BlogTableItem;
