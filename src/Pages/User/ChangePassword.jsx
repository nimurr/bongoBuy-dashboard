import { Label } from "flowbite-react";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function ChangePassword() {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      <form className="bg-white dark:bg-[#1f2937] sm:p-10 p-5 rounded">
        <div className="relative">
          <div className="mb-2 block">
            <Label
              htmlFor="file-upload"
              value="Old Password"
              className="font-bold"
            />
          </div>

          {!show ? (
            <FaEyeSlash
              onClick={handleShow}
              className="z-50 absolute cursor-pointer right-5 top-11 text-white text-xl"
            />
          ) : (
            <FaEye
              onClick={handleShow}
              className="z-50 absolute cursor-pointer right-5 top-11 text-white text-xl"
            />
          )}
          <input
            rows={1}
            required
            type={`${!show ? "password" : "text"}`}
            name=""
            className="w-full relative dark:text-white rounded dark:bg-transparent border-gray-400"
            placeholder="Old Password"
            id=""
          />
        </div>

        <div className="relative mt-5">
          <div className="mb-2 block">
            <Label
              htmlFor="file-upload"
              value="New Password"
              className="font-bold"
            />
          </div>

          {!show ? (
            <FaEyeSlash
              onClick={handleShow}
              className="z-50 absolute cursor-pointer right-5 top-11 text-white text-xl"
            />
          ) : (
            <FaEye
              onClick={handleShow}
              className="z-50 absolute cursor-pointer right-5 top-11 text-white text-xl"
            />
          )}
          <input
            required
            rows={1}
            type={`${!show ? "password" : "text"}`}
            name=""
            className="w-full relative dark:text-white rounded dark:bg-transparent border-gray-400"
            placeholder="New Password"
            id=""
          />
        </div>

        <div className="relative mt-5">
          <div className="mb-2 block">
            <Label
              htmlFor="file-upload"
              value="Confirm New Password"
              className="font-bold"
            />
          </div>

          {!show ? (
            <FaEyeSlash
              onClick={handleShow}
              className="z-50 absolute cursor-pointer right-5 top-11 text-white text-xl"
            />
          ) : (
            <FaEye
              onClick={handleShow}
              className="z-50 absolute cursor-pointer right-5 top-11 text-white text-xl"
            />
          )}
          <input
            rows={1}
            required
            type={`${!show ? "password" : "text"}`}
            name=""
            className="w-full relative dark:text-white rounded dark:bg-transparent border-gray-400"
            placeholder="Confirm New Password"
            id=""
          />
        </div>

        <div>
          <input
            className="w-full block mt-5 bg-blue-600 rounded text-white font-bold py-3 cursor-pointer"
            type="submit"
            value="Update"
          />
        </div>
      </form>
    </div>
  );
}
