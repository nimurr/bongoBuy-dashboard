import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } from "../../redux/features/category/category";
import Url from "../../redux/baseApi/forImageUrl";

export default function AddCategories() {

  const { data } = useGetCategoriesQuery();
  const fullData = data?.data?.attributes;
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();


  const [categories, setCategories] = useState([
    {
      _id: "1",
      categoryName: "Electronics",
      uploadImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6uEju2_kYz0XoV8BDIaL3q1aEukEeW22B4l-ljFEZDK1dofra",
    },
    {
      _id: "2",
      categoryName: "Fashion",
      uploadImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6uEju2_kYz0XoV8BDIaL3q1aEukEeW22B4l-ljFEZDK1dofra",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Handle image preview (demo only)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  };

  // Add category (demo)
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];

    if (!name || !image) {
      toast.error("All Field are Required");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const res = await createCategory(formData).unwrap()
      console.log(res)
      if (res?.code === 200) {
        toast.success("Category Create Successfully ");
        setIsModalOpen(false)
        form.reset();
        setImagePreview('')
      }
    } catch (error) {
      toast.error(error?.data?.message)
    }

  };

  // Delete category (demo)
  const handleDeleteCategory = async (id) => {

    try {
      const res = await deleteCategory(id).unwrap()
      console.log(res)
      if (res?.code === 200) {
        toast.success("Category Create Successfully ");
      }
    } catch (error) {
      toast.error(error?.data?.message)
    }


  };

  return (
    <div>
      <ToastContainer />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Categories</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="grid sm:grid-cols-2 text-white lg:grid-cols-4  gap-4">
        {fullData?.map((category) => (
          <div
            key={category._id}
            className="border rounded-lg bg-slate-800 p-2 flex items-center justify-between relative"
          >
            <div className="flex items-center gap-3">
              <img
                src={Url + category.image}
                alt={category.name}
                className="h-12 w-12 object-cover"
              />
              <span>{category.name}</span>
            </div>
            <button
              onClick={() => handleDeleteCategory(category._id)}
              className="text-red-600 text-2xl"
            >
              <MdDeleteForever />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 w-[90%] max-w-lg rounded">
            <h3 className="text-xl font-semibold mb-4 text-white">Add Category</h3>

            <form onSubmit={handleAddCategory}>
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                className="w-full border rounded-lg bg-transparent text-white p-2 mb-3"
              />

              {/* File Upload Input with Preview */}
              <label className="w-full flex flex-col items-center px-4 py-6 border-dashed text-white border-white hover:border-prumary text-blue rounded-lg shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-primary mb-3">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  {imagePreview ? "Image Selected" : "Select a file"}
                </span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  name="image"
                />
              </label>

              {/* Show Preview */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-24 w-24 object-cover border rounded mb-3"
                />
              )}


              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-red-600 text-yellow-50 rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 !bg-primary text-white rounded-sm"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
