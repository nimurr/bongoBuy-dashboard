import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCreateBannerMutation, useDeleteBannerMutation, useGetBannerQuery, useUpdateBannerMutation } from "../../redux/features/banner/banner";
import Url from "../../redux/baseApi/forImageUrl";

export default function SliderImages() {
  const { data, isLoading } = useGetBannerQuery();
  const banners = data?.data?.attributes || [];

  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  console.log(banners)

  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);

  /* ---------------- ADD IMAGE ---------------- */
  const handleAddBanner = async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await createBanner(formData).unwrap();
      console.log(res)
      if (res?.code == 201) {
        toast.success("Banner added successfully");
        setOpenModal(false);
      }
    } catch (error) {

    }

    console.log("NEW IMAGE:", image);
    toast.success("Banner added (UI only)");
    setOpenModal(false);
    setImage(null);
  };

  /* ---------------- STATUS TOGGLE ---------------- */
  const handleToggleStatus = (item) => {
    console.log("STATUS TOGGLE:", item._id, !item.active);
    toast.success("Status updated (UI only)");
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = (id) => {
    console.log("DELETE ID:", id);
    toast.success("Banner deleted (UI only)");
  };

  return (
    <div>
      <ToastContainer />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-semibold dark:text-white">
          Slider Images
        </h2>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 !bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPlus /> Add Image
        </button>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="h-[20vh] flex justify-center items-center">
          <p className="text-white">Loading banners...</p>
        </div>
      )}

      {/* NO DATA */}
      {!isLoading && !banners.length && (
        <p className="text-red-500">No banner images found</p>
      )}

      <img src="http://192.168.31.188:3000/Image/BannerAds/nfv2-1769270267348.png" alt="" />



      {/* BANNERS */}
      <div className="flex flex-wrap gap-4">
        {banners.map((item) => (
          <div
            key={item._id}
            className="relative border rounded overflow-hidden"
          >
            {/* IMAGE */}
            <div className="flex items-center gap-3">
              <img
                src={Url + item.image}
                className="h-12 w-12 rounded"
              />
            </div>

            {/* STATUS */}
            <button
              onClick={() => handleToggleStatus(item)}
              className={`absolute bottom-1 left-1 px-2 py-1 text-xs rounded text-white ${item.active ? "bg-green-600" : "bg-red-600"
                }`}
            >
              {item.active ? "Active" : "Inactive"}
            </button>

            {/* DELETE */}
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-1 right-1 bg-black/70 text-red-500 p-2 rounded-full"
            >
              <MdDeleteForever className="text-xl" />
            </button>
          </div>
        ))}
      </div>

      {/* ---------------- MODAL ---------------- */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded w-[350px]">
            <h3 className="text-xl font-semibold mb-4">
              Add Banner Image
            </h3>

            <label className="w-full border flex flex-col items-center px-4 py-6 border-dashed border-white rounded cursor-pointer mb-3 text-white">
              <span className="flex flex-col justify-center items-center gap-2">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" > <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" /> </svg>
                Add Images
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddBanner}
                className="px-8 py-2 !bg-primary text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
