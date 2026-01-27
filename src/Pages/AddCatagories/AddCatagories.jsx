import { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/features/category/category";

import Url from "../../redux/baseApi/forImageUrl";

export default function AddCategories() {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data?.attributes || [];

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  /* ================= OPEN MODAL ================= */
  const openCreateModal = () => {
    setEditingCategory(null);
    setImagePreview("");
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = (category) => {
    setEditingCategory(category);
    setImagePreview(Url + category.image);
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    if (!name || (!selectedImage && !editingCategory)) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      let res;

      if (editingCategory) {
        res = await updateCategory({
          id: editingCategory._id,
          data: formData,
        }).unwrap();
      } else {
        res = await createCategory(formData).unwrap();
      }

      if (res?.code === 200) {
        toast.info(
          editingCategory
            ? "Category Updated Successfully"
            : "Category Created Successfully"
        );
        setIsModalOpen(false);
        setImagePreview("");
        setSelectedImage(null);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id).unwrap();
      if (res?.code === 200) {
        toast.warning("Category Deleted Successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>
      <ToastContainer />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Categories</h2>
        <button
          onClick={openCreateModal}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {/* LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-slate-800 p-3 rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <img
                src={Url + category.image}
                className="h-12 w-12 object-cover rounded"
              />
              <span>{category.name}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openUpdateModal(category)}
                className="text-yellow-400 text-xl"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="text-red-600 text-2xl"
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL (CREATE + UPDATE) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 w-[90%] max-w-lg rounded">
            <h3 className="text-xl text-white mb-4">
              {editingCategory ? "Update Category" : "Add Category"}
            </h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                defaultValue={editingCategory?.name || ""}
                placeholder="Category Name"
                className="w-full bg-transparent border text-white p-2 mb-3 rounded"
              />

              {/* IMAGE UPLOAD */}
              <label className="w-full border flex flex-col items-center px-4 py-6 border-dashed border-white rounded cursor-pointer mb-3 text-white">
                <span className="flex flex-col justify-center items-center gap-2">
                  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" > <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" /> </svg>
                  {imagePreview ? "Change Image" : "Select Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* PREVIEW */}
              {imagePreview && (
                <div className="relative mb-3">
                  <img
                    src={imagePreview}
                    className="h-24 w-24 border p-5 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 left-24 bg-red-600 text-white px-2 rounded"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 px-4 py-2 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="!bg-primary px-6 py-2 text-white rounded"
                >
                  {editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
