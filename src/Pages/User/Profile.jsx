import { Label } from "flowbite-react";

export default function Profile() {
  return (
    <div>
      <form className="bg-white dark:bg-[#1f2937] sm:p-10 p-5 rounded">
        <div className="">
          <div className="mb-2 block">
            <Label
              htmlFor="file-upload"
              value="Profile Image"
              className="font-bold"
            />
          </div>
          <input
            rows={1}
            type="file"
            required
            name=""
            className="w-full border dark:text-white rounded dark:bg-transparent border-gray-400"
            placeholder="User Name"
            id=""
          />
        </div>
        <div className="mt-6">
          <div className="mb-2 block">
            <Label
              htmlFor="file-upload"
              value="Update User Name"
              className="font-bold"
            />
          </div>
          <input
            rows={1}
            type="text"
            required
            name=""
            className="w-full dark:text-white rounded dark:bg-transparent border-gray-400"
            placeholder="User Name"
            id=""
          />
        </div>

        <div className="mt-6">
          <div className="mb-2 block">
            <Label
              htmlFor="file-upload"
              value="Update Email"
              className="font-bold"
            />
          </div>
          <input
            rows={1}
            type="email"
            required
            name=""
            className="w-full dark:text-white rounded dark:bg-transparent border-gray-400"
            placeholder="Your Email"
            id=""
          />
        </div>

        <div className="mt-6">
          <div className="mb-2 block">
            <Label
              htmlFor="file-upload"
              value="Contact Phone"
              className="font-bold"
            />
          </div>
          <input
            rows={1}
            type="number"
            name=""
            required
            className="w-full dark:text-white rounded dark:bg-transparent border-gray-400"
            placeholder="Phone"
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
