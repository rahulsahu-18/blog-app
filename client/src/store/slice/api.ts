import type { Blog, Icomment } from "@/vite-env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    loginAdmin: builder.mutation<
      { success: boolean; message: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "admin/login",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    getAllBlogs: builder.query<{ success: boolean; allBlog: Blog[] }, void>({
      query: () => ({ url: "blog/getAllBlog" }),
    }),
    getBlogById: builder.query<{success:boolean , blog:Blog}, string>({
      query: (id) => `blog/getOneBlog/${id}`,
    }),
    getcomment:builder.query<{success:boolean,comments:Icomment[]},string>({
      query:(id) => `blog/comments/${id}`,
    }),
    addComment:builder.mutation<{message:string,success:boolean},{blog:string,name:string,content:string}>({
      query:(body) => ({
        url:'blog/add-comment',
        body:body,
        method:'POST'
      })
    })
  }),
});

export const {
  useLoginAdminMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useGetcommentQuery,
  useAddCommentMutation
} = api;
export default api;
