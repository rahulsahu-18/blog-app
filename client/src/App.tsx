import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comment from "./pages/admin/Comment";
import Login from "./components/admin/Login";
import "quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { useEffect } from "react";
import { useGetAllBlogsQuery } from "./store/slice/api";
import toast from "react-hot-toast";
import { updateAllBlogs } from "./store/slice/loginSlice";

export default function App() {
  const dispatch = useDispatch();
  const islogin = useSelector(
    (state: RootState) => state.loginSlice.isLoggedIn,
  );
  const { data,error } = useGetAllBlogsQuery();
  useEffect(() => {
    if (data?.success) {
      dispatch(updateAllBlogs(data.allBlog));
    }
    if(error)
     toast.error('blog cant be fetch')
  }, [data,error, dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={islogin ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comment />} />
        </Route>
      </Routes>
    </div>
  );
}
