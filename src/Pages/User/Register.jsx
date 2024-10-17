import { Label, Radio } from "flowbite-react";
import { MdOutlineMail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="absolute top-0 left-0 z-50  backdrop-blur-lg w-[99vw]  h-[100vh] pb-10">
      <div className="dark:bg-white bg-gray-800 mx-2 dark:text-gray-300 mt-10 sm:w-[500px] w-full p-5 rounded-md sm:mx-auto ">
        <h1 className="text-4xl font-semibold text-center text-white dark:text-black ">
          Register Now
        </h1>
        <form action="">
          <span className="mt-5 block text-white dark:text-black ">
            Full Name
          </span>
          <label
            className="border  bg-transparent text-white dark:text-black overflow-hidden rounded flex items-center"
            htmlFor=""
          >
            <MdOutlineMail className="mx-3 text-xl w-5" />
            <input
              className="border-0 bg-transparent text-white dark:text-black w-full border-l "
              type="text"
              placeholder="Enter Your Full Name"
            />
          </label>

          <span className="mt-5 block text-white dark:text-black ">Email</span>
          <label
            className="border  bg-transparent text-white dark:text-black overflow-hidden rounded flex items-center"
            htmlFor=""
          >
            <MdOutlineMail className="mx-3 text-xl w-5" />
            <input
              className="border-0 bg-transparent text-white dark:text-black w-full border-l "
              type="email"
              placeholder="Enter Your Email"
            />
          </label>

          <span className="mt-5 block text-white dark:text-black ">
            Password
          </span>
          <label
            className="border bg-transparent text-white dark:text-black overflow-hidden rounded  flex items-center"
            htmlFor=""
          >
            <TbPasswordFingerprint className="mx-3 text-xl w-5" />
            <input
              className="border-0 bg-transparent text-white dark:text-black w-full border-l "
              type="password"
              placeholder="Enter password"
            />
          </label>

          <fieldset className="flex max-w-md flex-col gap-4 my-5" >
            <legend className="mb-4 text-white dark:text-black">Choose Your Gender</legend>
            <div className="flex items-center gap-2 dark:text-black text-white">
              <Radio
                id="united-state"
                name="countries"
                value="Mail"
                defaultChecked
              />
              <Label htmlFor="united-state" className="dark:text-black text-white">Mail</Label>
            </div>
            <div className="flex items-center gap-2  dark:text-black text-white">
              <Radio id="germany" name="countries" value="FeMail" />
              <Label htmlFor="germany" className="dark:text-black text-white">FeMail</Label>
            </div>

          </fieldset>

          <button
            type="submit"
            className="mb-5 p-2 w-full bg-blue-600 rounded text-white"
          >
            Register
          </button>
          <br />
          <p className="font-semibold text-white dark:text-black">
            Have a Account ?{" "}
            <Link className="text-blue-500" to={"/login"}>
              please Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
