import axios from "axios";
import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
 
 

export default function Settings() {
  const [settingData, setSettingData] = useState({});
  const [loading, setLoading] = useState(true); // For loading state

  console.log(import.meta.env.VITE_CRUD_API); // Logs: http://localhost:5000/api

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_CRUD_API}/site-settings`);
        setSettingData(res?.data[0]); // Assuming the data array structure
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSetting = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      email: form.email.value,
      phone: form.phone.value,
      appLink: form.appLink.value,
      fullAddress: form.fullAddress.value,
      wpNumber: form.wpNumber.value,
      fbLink: form.fbLink.value,
      instaLink: form.instaLink.value,
      linkedinLink: form.linkedinLink.value,
      // color: form.color.value,
    };

    console.log(formData)

    try {
      const response = await axios.put(
        `http://localhost:5000/site-settings/${settingData._id}`, // Use settingData._id directly
        formData
      ).then(res => {
        if(res?.data ){
          toast.success("Image upload failed !!", {
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
      })
      console.log("Update response:", response?.data);
      
      // You might want to show a success message or update the UI accordingly
    } catch (error) { 
      toast.error("Error updating settings !!", {
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

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSetting} className=" ">
        <h2 className="text-3xl font-bold mb-5 dark:text-white">Contact Information</h2>

        {/* <div className="bg-white p-5 my-5">
          <label className="block mt-5">
            <span className="block">Website Primary Color</span>
           <input type="color" name="color" id="" />
          </label>
        </div> */}

        <div className="bg-white dark:bg-gray-800 p-5 my-5">
          <label className="block">
            <span className="block dark:text-white">Email</span>
            <input
              type="email"
              className="border-2 border-gray-200 w-full"
              name="email"
              placeholder="Your Email"
              defaultValue={settingData?.email} // Use defaultValue directly
              required
            />
          </label>
          <label className="block  mt-5">
            <span className="block dark:text-white">Phone</span>
            <input
              type="tel" // Changed to tel for better mobile support
              className="border-2 border-gray-200 w-full"
              name="phone"
              placeholder="Your Phone Number"
              defaultValue={settingData.phone} // Use defaultValue directly
              required
            />
          </label>
          <label className="block  mt-5">
            <span className="block dark:text-white">Full Address</span>
            <textarea
              className="border-2 border-gray-200 w-full"
              name="fullAddress"
              placeholder="Full Address"
              defaultValue={settingData.fullAddress} // Use defaultValue directly
              required
            />
          </label>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 my-5">
          <label className="block mt-5">
            <span className="block dark:text-white">WhatsApp Number</span>
            <input
              type="tel" // Changed to tel for better mobile support
              className="border-2 border-gray-200 w-full"
              name="wpNumber"
              placeholder="Your WhatsApp Number"
              defaultValue={settingData.wpNumber} // Use defaultValue directly
            />
          </label>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 my-5">
          <label className="block mt-5">
            <span className="block dark:text-white">App Link</span>
            <input
              type="text"
              className="border-2 border-gray-200 w-full"
              name="appLink"
              placeholder="Your App Link"
              defaultValue={settingData.appLink} // Use defaultValue directly
            />
          </label>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 my-5">
          <label className="block mt-5">
            <span className="block dark:text-white">Facebook</span>
            <input
              type="text"
              className="border-2 border-gray-200 w-full"
              name="fbLink"
              placeholder="Your Facebook Page Link"
              defaultValue={settingData.fbLink} // Use defaultValue directly
            />
          </label>
          <label className="block mt-5">
            <span className="block dark:text-white">Instagram</span>
            <input
              type="text"
              className="border-2 border-gray-200 w-full"
              name="instaLink"
              placeholder="Your Instagram Link"
              defaultValue={settingData.instaLink} // Use defaultValue directly
            />
          </label>
          <label className="block mt-5">
            <span className="block dark:text-white">LinkedIn</span>
            <input
              type="text"
              className="border-2 border-gray-200 w-full"
              name="linkedinLink"
              placeholder="Your LinkedIn Link"
              defaultValue={settingData.linkedinLink} // Use defaultValue directly
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white p-2 w-full rounded"
        >
          <CiSettings />
          Save Settings
        </button>
      </form>
    </div>
  );
}
