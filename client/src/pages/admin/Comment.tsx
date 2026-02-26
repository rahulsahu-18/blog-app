import CommentTableItem from "@/components/admin/CommentTableItem";
import { useGetCommentsQuery } from "@/store/slice/api";
import { useState } from "react";

function Comment() {
  const { data, isLoading, isError } = useGetCommentsQuery();
  const [filter, setFilter] = useState("Approved");

  const comments = data?.comments ?? [];

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th className="px-6 py-3">Blog Title & Comment</th>
              <th className="px-6 py-3 max-sm:hidden">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-6 py-4">Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td className="px-6 py-4 text-red-500">
                  Failed to load comments
                </td>
              </tr>
            ) : (
              comments
                .filter((comment) =>
                  filter === "Approved"
                    ? comment.isApproved === true
                    : comment.isApproved === false
                )
                .map((comment) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                  />
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comment;