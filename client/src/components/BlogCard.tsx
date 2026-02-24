import type { Blog } from "@/vite-env";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blog: Blog;
}

function BlogCard({ blog }: BlogCardProps) {

  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow 
      hover:scale-105 hover:shadow-lg duration-300 
      cursor-pointer transition-all"
    >
      <img
        src={image}
        alt={title}
        className="aspect-video w-full object-cover"
      />

      <span
        className="ml-5 mt-4 px-3 py-1 inline-block 
        bg-(--color-primary)/20 
        text-(--color-primary)
        text-xs rounded-full"
      >
        {category}
      </span>

      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">
          {title}
        </h5>

        <p className="mb-3 text-xs text-gray-600" dangerouslySetInnerHTML={{"__html":description.slice(0, 80)}}>
         
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
