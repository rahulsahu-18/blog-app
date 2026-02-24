import { useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Moment from "moment";
import NavBar from "../components/NavBar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import {
  useAddCommentMutation,
  useGetBlogByIdQuery,
  useGetcommentQuery,
} from "@/store/slice/api";

const Blog = () => {
  const { id } = useParams<{ id: string }>();

  // 🔥 Blog Fetch
  const { data, isLoading, error } = useGetBlogByIdQuery(id!, {
    skip: !id,
  });

  // 🔥 Comments Fetch
  const { data: commentData, isLoading: commentLoading } =
    useGetcommentQuery(id!, { skip: !id });

  const comments = commentData?.comments || [];

  // 🔥 Mutation
  const [addComment, { isLoading: isSubmitting }] =
    useAddCommentMutation();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // ✅ Proper Submit Handler
  const handleAddComment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id) return;

    try {
      const res = await addComment({
        blog: id,
        name,
        content,
      }).unwrap();

      if (res.success) {
        toast.success(res.message);   // 🔥 SUCCESS TOAST
        setName("");
        setContent("");
      }
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };

  if (isLoading)
    return <div className="mt-40 text-center">Loading...</div>;

  if (error || !data?.blog)
    return <div className="mt-40 text-center">Blog not found</div>;

  const blog = data.blog;

  return (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-10 opacity-50"
      />

      <NavBar />

      {/* Header Section */}
      <div className="text-center mt-24 text-gray-600 px-4">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(blog.createdAt).format("MMMM DD, YYYY")}
        </p>

        <h1 className="text-3xl sm:text-6xl font-semibold max-w-3xl mx-auto text-gray-800 leading-tight">
          {blog.title}
        </h1>

        <h2 className="my-6 max-w-2xl mx-auto text-lg text-gray-500">
          {blog.subTitel}
        </h2>

        <p className="inline-block py-1 px-5 rounded-full mb-10 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          {blog.category}
        </p>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-5">
        <img
          src={blog.image}
          alt=""
          className="w-full h-[500px] object-cover rounded-3xl mb-12 shadow-lg"
        />
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto px-6">
        <div
          className="rich-text text-gray-700 leading-8 text-lg"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>

      {/* Comments Section */}
      <div className="mt-20 mb-10 max-w-3xl mx-auto px-6">
        <p className="font-semibold mb-8 text-xl">
          Comments ({comments.length})
        </p>

        {commentLoading && (
          <p className="text-gray-500">Loading comments...</p>
        )}

        <div className="flex flex-col gap-4">
          {comments
            .filter((item: any) => item.isApproved)
            .map((item: any) => (
              <div
                key={item._id}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={assets.user_icon}
                    alt=""
                    className="w-6"
                  />
                  <p className="font-medium">{item.name}</p>
                </div>

                <p className="text-sm max-w-md ml-8">
                  {item.content}
                </p>

                <div className="absolute right-4 bottom-3 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Comment */}
      <div className="max-w-3xl mx-auto px-6 mb-20">
        <p className="font-semibold mb-4 text-lg">
          Add your comment
        </p>

        <form
          onSubmit={handleAddComment}
          className="flex flex-col gap-4 max-w-lg"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            required
            className="w-full p-3 border border-gray-300 rounded outline-none"
          />

          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Comment"
            required
            className="w-full p-3 border border-gray-300 rounded outline-none h-40"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-(--color-primary) text-white rounded p-3 px-8 hover:scale-105 transition-all cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;