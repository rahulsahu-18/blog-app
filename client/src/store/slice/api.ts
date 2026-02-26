import type { Blog, DashboardData, Icomment } from "@/vite-env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    credentials: "include",
  }),

  tagTypes: ["Blog", "Comment", "Dashboard"],

  endpoints: (builder) => ({
    //  ADMIN LOGIN 
    loginAdmin: builder.mutation<
      { success: boolean; message: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "admin/login",
        method: "POST",
        body,
      }),
    }),

    //  PUBLIC BLOG 
    getAllBlogs: builder.query<{ success: boolean; allBlog: Blog[] }, void>({
      query: () => ({ url: "blog/getAllBlog" }),
      providesTags: ["Blog"],
    }),

    getBlogById: builder.query<{ success: boolean; blog: Blog }, string>({
      query: (id) => `blog/getOneBlog/${id}`,
    }),

    //  PUBLIC COMMENTS 
    getcomment: builder.query<
      { success: boolean; comments: Icomment[] },
      string
    >({
      query: (id) => `blog/comments/${id}`,
      providesTags: ["Comment"],
    }),

    addComment: builder.mutation<
      { message: string; success: boolean },
      { blog: string; name: string; content: string }
    >({
      query: (body) => ({
        url: "blog/add-comment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),

    //  ADMIN BLOG 
    getAllBlog: builder.query<{ success: boolean; blogs: Blog[] }, void>({
      query: () => ({
        url: "admin/blogs",
      }),
      providesTags: ["Blog"],
    }),

    addBlog: builder.mutation<
      { message: string; success: boolean },
      FormData
    >({
      query: (formData) => ({
        url: "blog/addblog",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Blog", "Dashboard"], 
    }),

    deleteBlog: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `blog/deleteOne/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog", "Dashboard"], 
    }),

    togglePublish: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `blog/toggle/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Blog", "Dashboard"],
    }),

    // ADMIN DASHBOARD 
    getAdmin: builder.query<
      { success: boolean; dashboardData: DashboardData },
      void
    >({
      query: () => ({ url: "admin/dashboard" }),
      providesTags: ["Dashboard"],
    }),

    // ADMIN COMMENTS 
    getComments: builder.query<
      { success: boolean; comments: Icomment[] },
      void
    >({
      query: () => ({
        url: "admin/comments",
      }),
      providesTags: ["Comment"],
    }),

    deleteComment: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `admin/delete-comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment", "Dashboard"], 
    }),

    approveComment: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `admin/approve-comment/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Comment", "Dashboard"], 
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useGetcommentQuery,
  useAddCommentMutation,
  useAddBlogMutation,
  useGetAllBlogQuery,
  useDeleteBlogMutation,
  useTogglePublishMutation,
  useGetAdminQuery,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useApproveCommentMutation,
} = api;

export default api;