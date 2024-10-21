import axios from "axios";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

export default function SliderImages() {
  const [uploadImages, setUploadImages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

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

    setLoading(true); // Set loading to true when upload starts
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
        toast.error("Image upload failed");
        setLoading(false); // Stop loading if error occurs
        return;
      }
    }
    setUploadImages((prevImages) => [...prevImages, ...uploadedImages]);
    setLoading(false); // Stop loading when upload finishes
  };

  const removeImage = (index) => {
    const newImages = uploadImages.filter((_, idx) => idx !== index);
    setUploadImages(newImages);
  };

  const handleSliderImage = () => {
    if (uploadImages.length === 0) {
      return toast.error("Please upload images before submitting.", {
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

    axios
      .put("http://localhost:5000/slider-images/67162048ab387caf55c21e2b", { images: uploadImages })
      .then((response) => {
        console.log("Images submitted successfully", response);
        toast.success("Images submitted successfully!", {
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
      .catch((error) => {
        console.error("Error submitting images", error);
        toast.error("Error submitting images.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-3xl font-semibold dark:text-white mb-5">Slider Images</h2>

      <div className="w-full items-center justify-center bg-grey-lighter">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-primary">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select files</span>
          <input
            onChange={handleImageChange}
            type="file"
            className="hidden"
            multiple // Allow multiple file selection
          />
        </label>
      </div>

      {/* Show loading message while images are being uploaded */}
      {loading && <p>Uploading images, please wait...</p>}

      {!uploadImages.length && !loading ? <h2>No Images Uploaded</h2> : null}
      {/* Display uploaded images */}
      <div className="my-5 flex flex-wrap gap-2">
        {uploadImages.map((image, idx) => (
          <div key={idx} className="relative">
            <img className="min-w-36 max-w-96" src={image} alt={`Uploaded ${idx}`} />
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

      <button
        className="bg-blue-700 inline-block text-white py-2 px-8 font-semibold rounded"
        onClick={handleSliderImage}
        disabled={loading} // Disable submit button while loading
      >
        {loading ? "Uploading..." : "Submit"}
      </button>
    </div>
  );
}
