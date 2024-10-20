import axios from "axios";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function AddProducts() { 

  const [uploadImages, setUploadImages] = useState([]);

  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (files.length === 0) {
      return toast.error("No files uploaded", {
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

    const uploadedImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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
        uploadedImages.push(uploadImageURL);
      } catch (error) {
        console.error("Error uploading the image:", error);
        alert("Image upload failed");
        return;
      }
    }
    setUploadImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const removeImage = (index) => {
    const newImages = uploadImages.filter((_, idx) => idx !== index);
    setUploadImages(newImages);
  };
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    pCode: "",
    rPrice: "",
    discount: "",
    sizes: [""], // Initialize with one size input
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSizeChange = (index, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = value;
    setFormData((prevData) => ({ ...prevData, sizes: newSizes }));
  };

  const addSizeField = () => {
    setFormData((prevData) => ({
      ...prevData,
      sizes: [...prevData.sizes, ""],
    }));
  };

  const removeSizeField = (index) => {
    const newSizes = formData.sizes.filter((_, idx) => idx !== index);
    setFormData((prevData) => ({ ...prevData, sizes: newSizes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadImages.length === 0) {
      return toast.error("Please upload at least one image.", {
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
    const data = { ...formData, uploadImages };
    await axios.post("http://localhost:5000/addProducts", data) 
    .then(res => {
      toast.success("Product Add Successfully !!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })



    console.log(data);
    setFormData({
      name: "",
      category: "",
      quantity: "",
      pCode: "",
      rPrice: "",
      discount: "",
      sizes: [""], // Reset sizes to initial state
      description: "",
    });
    setUploadImages([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md dark:bg-gray-800">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Product Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Images
          </label>
          <div className="grid grid-cols-2 gap-2 w-full items-center justify-center bg-grey-lighter">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-primary">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select files
              </span>
              <input
                onChange={handleImageChange}
                type="file"
                className="hidden"
                multiple // Allow multiple file selection
              />
            </label>
          </div>
          {/* Display uploaded images */}
          <div className="mt-4 flex flex-wrap gap-2">
            {uploadImages.map((image, idx) => (
              <div key={idx} className="relative">
                <img className="w-28" src={image} alt={`Uploaded ${idx}`} />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <MdDeleteForever className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Other input fields */}

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
            placeholder="Enter product name"
          />
        </div>

        {/* Product Category (Select Option) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="mt-1 block sm:w-full overflow-hidden text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="T-shirt">T-shirt</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
            <option value="Jeans">Jeans</option>
          </select>
        </div>

        {/* Product Code */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Product Code (P-Code)
          </label>
          <input
            type="text"
            name="pCode"
            value={formData.pCode}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
            placeholder="Enter product code"
          />
        </div>

        {/* Regular Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Regular Price (R-Price)
          </label>
          <input
            type="number"
            name="rPrice"
            value={formData.rPrice}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
            placeholder="Enter regular price"
          />
        </div>

        {/* Discount */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Discount (Optional)
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
            placeholder="Enter discount percentage"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <input
            type="number"
            name="quantity" // Corrected from "discount" to "quantity"
            value={formData.quantity}
            required
            onChange={handleInputChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
            placeholder="Enter Quantity"
          />
        </div>

        {/* Sizes (Add/Remove Fields) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sizes (Optional)
          </label>
          {formData.sizes.map((size, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={size}
                onChange={(e) => handleSizeChange(idx, e.target.value)}
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
                placeholder={`Size ${idx + 1}`}
              />
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => removeSizeField(idx)}
                  className="bg-red-500 text-white rounded-full p-1"
                >
                  <MdDeleteForever className="text-xl" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSizeField}
            className="mt-2 bg-blue-600 text-white p-2 rounded-md"
          >
            Add Size
          </button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
            placeholder="Enter product description"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 font-medium bg-[#0dc043] text-white w-full rounded-lg hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary dark:bg-primary dark:hover:bg-primary-dark"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
