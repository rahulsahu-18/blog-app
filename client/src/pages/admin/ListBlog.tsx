import BlogTableItem from "@/components/admin/BlogTableItem";
import type { Blog } from "@/vite-env";
import { useGetAllBlogQuery } from "@/store/slice/api";

function ListBlog() {

  const { data, isLoading, isError, refetch } = useGetAllBlogQuery();

  if (isLoading) {
    return <div className="p-5">Loading blogs...</div>;
  }

  if (isError) {
    return <div className="p-5 text-red-500">Failed to load blogs</div>;
  }

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1 className="text-xl font-semibold">All Blogs</h1>

      <div className="relative mt-4 h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th className="px-2 py-4 xl:px-6">#</th>
              <th className="px-2 py-4">Blog Title</th>
              <th className="px-2 py-4 max-sm:hidden">Date</th>
              <th className="px-2 py-4 max-sm:hidden">Status</th>
              <th className="px-2 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.blogs.map((blog: Blog, index: number) => (
              <BlogTableItem
                key={blog._id}
                Blog={blog}
                index={index + 1}
                fetchBlogs={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBlog;