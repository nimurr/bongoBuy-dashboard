import axios from "axios";
import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function AddCategories() {
  const [uploadImage, setUploadImage] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend on component load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/all-categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle image upload
  const handleImageChange = async (e) => {
    setUploadImage("");
    const file = e.target.files[0];
    if (!file) {
      return alert("File not uploaded");
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "for_usering_e_Commarce");
    data.append("cloud_name", "nerob");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/nerob/image/upload",
        data
      );
      const uploadImageURL = res.data.secure_url;
      setUploadImage(uploadImageURL);
    } catch (error) {
      console.error("Error uploading the image:", error);
      toast.error("Image upload failed !!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Handle adding a new category
  const handleAddCategories = async (e) => {
    e.preventDefault();
    const categoryName = e.target.categoryName.value;

    if (!uploadImage) {
      return toast.error("Please wait for the image to upload...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const formData = { categoryName, uploadImage };

    try {
      const response = await axios.post(
        "http://localhost:5000/all-categories",
        formData
      );
      if (response.status === 200) {
        alert("");
        toast.success("Category added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setUploadImage("");
        e.target.categoryName.value = "";
        // Refresh categories list
        setCategories([...categories, response.data]);
      } else {
        toast.error("Something went wrong, please try again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("");
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/all-categories/${id}`
      );
      if (res.status === 200) {
        toast.success("Category deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // Remove the deleted category from the state
        setCategories(categories.filter((category) => category._id !== id));
      } else {
        toast.error("Failed to delete category", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-semibold dark:text-white">Add Categories</h2>
      <form
        onSubmit={handleAddCategories}
        className="md:w-[500px] mx-auto items-center my-10 border-2 md:p-5 p-3"
      >
        <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-primary">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input onChange={handleImageChange} className="hidden" type="file" />
        </label>
        <input
          className="border-0 sm:min-w-48 w-full pr-20 my-4"
          type="text"
          defaultValue={uploadImage ? uploadImage : ""}
          placeholder={"Uploading Image URL ..."}
        />
        <input
          className="border-0 sm:min-w-48 w-full pr-20 my-4"
          type="text"
          name="categoryName"
          placeholder="Add Categories"
        />
        <button className="p-2 text-center bg-primary text-white font-semibold border-0 w-full">
          Add Categories
        </button>
      </form>

      {/* Show categories with delete button */}
      <div className="grid sm:grid-cols-2 grid-cols-1 justify-between gap-2">
        {categories.map((category) => (
          <div
            key={category._id}
            className="border-2 py-2 px-5 w-full mb-2 text-primary flex justify-between items-center relative"
          >
            <div>
              <img
                src={category.uploadImage}
                alt={category.categoryName}
                className="h-12 w-12 object-cover"
              />
            </div>
            <div>{category.categoryName}</div>
            <button
              onClick={() => handleDeleteCategory(category._id)}
              className="absolute top-0 right-0 text-2xl text-red-600"
            >
              <MdDeleteForever />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
