import { assets } from "@/assets/assets";
import {
  useApproveCommentMutation,
  useDeleteCommentMutation,
} from "@/store/slice/api";
import type { Icomment } from "@/vite-env";
import toast from "react-hot-toast";

interface Props {
  comment: Icomment;
}

const CommentTableItem = ({ comment }: Props) => {
  const { blog, createdAt } = comment;

  const BlogDate = createdAt ? new Date(createdAt) : null;

  const [approveComment] = useApproveCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleApprove = async () => {
    try {
    const result = await approveComment(comment._id).unwrap();
    toast.success(result.message);
    } catch (error) {
      toast.error('something went worng')
    }
  };

  const handleDelete = async () => {
    try {
    const result = await deleteComment(comment._id).unwrap();
    toast.success(result.message);
    } catch (error) {
      toast.error('something went worng')
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b>Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>

      {/* ✅ Date fixed */}
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate ? BlogDate.toLocaleDateString() : "No Date"}
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-3 items-center">
          {!comment.isApproved ? (
            <img
              onClick={handleApprove}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img
            onClick={handleDelete}
            src={assets.bin_icon}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;