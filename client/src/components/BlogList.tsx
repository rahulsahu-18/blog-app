import { blogCategories } from "../assets/assets";
import { useState } from "react";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

function BlogList() {
  const [menu, setMenu] = useState("All");
  const input = useSelector((state: RootState) => state.loginSlice.input);
  const blog_data = useSelector((state: RootState) => state.loginSlice.allBlog);
  const filtered_blog = () => {
    let filtered = blog_data;
    if (menu !== "All") {
      filtered = filtered.filter((blog) => blog.category === menu);
    }
    if (input.trim() !== "") {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(input.toLowerCase()) ||
          blog.category.toLowerCase().includes(input.toLowerCase())
      );
    }
    return filtered;
  };
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 re">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5 "
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1
                              bg-(--color-primary) rounded-full"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filtered_blog().map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default BlogList;
