import { assets, blogCategories } from "@/assets/assets";
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { useAddBlogMutation } from "@/store/slice/api";
import toast from "react-hot-toast";

function AddBlog() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef<Quill | null>(null);
 const [addBlog, { isLoading }] = useAddBlogMutation();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!image){
    toast.error('add thumbnill image');
    return;
  }

  try {
    const formData = new FormData();

    // 🔥 Quill content
    const description = quillRef.current?.root.innerHTML || "";

    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("isPublished", String(isPublished));
    formData.append("image", image);

    const res = await addBlog(formData).unwrap();
    toast.success(res.message);

    // Optional reset
    setTitle("");
    setSubTitle("");
    setCategory("Startup");
    setIsPublished(false);
    setImage(null);
    quillRef.current?.setText("");

  } catch (error) {
    toast.success("something went worng");
  }
};
  const generateContent = () => {};

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
        <p className="mt-4">Blog title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full
max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p className="mt-4">Sub title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full
max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-1g h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            type="button"
            onClick={generateContent}
            className="absolute
bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5
rounded hover: underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>
        <p className="mt-4">Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none
rounded"
        >
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125
cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>
        <button type="submit" className='mt-8 w-40 h-10 bg-(--color-primary) text-white
rounded cursor-pointer text-sm'>{isLoading ? "Adding...": "Add blog"}</button>
      </div>
    </form>
  );
}

export default AddBlog;
