import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admins() {
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for fetching admins
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission

  // Fetch admin data
  const fetchAdminData = () => {
    setLoading(true); // Start loading
    fetch("http://localhost:5000/all-admins") // Changed to local route
      .then((res) => res.json())
      .then((result) => {
        setAdminData(result);
      })
      .finally(() => setLoading(false)); // Stop loading
  };

  useEffect(() => {
    fetchAdminData(); // Fetch admin data on component mount
  }, []);

  // Handle add admin form submission
  const handleAdmin = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading on form submission
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const formData = { name, email };

    fetch("http://localhost:5000/all-admins", {
      // Changed to local route
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to send data to the server.");
        }
        return res.json();
      })
      .then((result) => {
        toast.success("Admin added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        form.reset(); // Reset form after successful submission
        fetchAdminData(); // Re-fetch admin data
      })
      .catch((error) => {
        toast.error(`Something went wrong! ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .finally(() => setIsSubmitting(false)); // Stop loading
  };

  // Handle remove admin
  const handleRemove = (id) => {
    setLoading(true); // Start loading while removing admin
    fetch(`http://localhost:5000/all-admins/${id}`, {
      // Changed to local route
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to remove admin.");
        }
        return res.json();
      })
      .then(() => {
        toast.success("Admin removed successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Update front-end by filtering out the removed admin
        setAdminData(adminData.filter((admin) => admin._id !== id));
      })
      .catch(() => {
        toast.error("Failed to remove admin!", {
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
      .finally(() => setLoading(false)); // Stop loading
  };

  return (
    <div>
      <ToastContainer />

      <form
        className="sm:w-[50%] mx-auto bg-primary  p-5"
        onSubmit={handleAdmin}
      >
        <h2 className="text-center my-5 font-bold text-white  text-3xl ">
          Add Admin
        </h2>
        <label>
          <span className="block text-white ">Add Admin Name</span>
          <input
            className="w-full "
            type="text"
            name="name"
            placeholder="Add Admin Name"
            required
            disabled={isSubmitting} // Disable input while submitting
          />
        </label>
        <label className="mt-3 block">
          <span className="block text-white">Add Admin Email</span>
          <input
            className="w-full"
            type="email"
            name="email"
            placeholder="Add Admin By Email"
            required
            disabled={isSubmitting} // Disable input while submitting
          />
        </label>
        <button
          className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold mt-5 p-2 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? (
            "Adding Admin..."
          ) : (
            <>
              <FaRegUser /> Add Admin
            </>
          )}
        </button>
      </form>

      {/* Existing admin list */}
      {loading ? (
        <div role="status" className="w-48 mx-auto my-20">
          <div className="w-20 mx-auto">
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <span className="block text-center dark:text-white text-xl">
            Loading...
          </span>
        </div>
      ) : (
        <div className="overflow-x-auto w-full mx-auto my-10">
          <h2 className="text-center text-2xl mb-5 dark:text-white font-semibold">
            All Admins
          </h2>
          <table className="min-w-full border-collapse bg-white dark:bg-gray-800 shadow-lg">
            <thead className="bg-primary dark:bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">SL</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminData?.map((admin, index) => (
                <tr
                  key={admin._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-700"
                >
                  <td className="py-2 px-4 text-left font-medium">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4">{admin.name}</td>
                  <td className="py-2 px-4">{admin.email}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="btn btn-xs bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                      onClick={() => handleRemove(admin._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
