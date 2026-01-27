import { useContext, useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { json, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";

export default function Login() {

  const navigate = useNavigate();
  const [loginSubmit] = useLoginMutation();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const fullData = { email, password };

    try {
      const data = await loginSubmit(fullData).unwrap();

      if (data?.code == 200) {
        localStorage.setItem("token", data?.data?.attributes?.tokens?.access?.token)
        localStorage.setItem("user", JSON.stringify(data?.data?.attributes?.user))
        // toast.success(data?.message)
        navigate('/')

      }

    } catch (error) {
      toast.error(error?.data?.message)
      alert(error?.data?.message)
    }

  };



  return (
    <div className="absolute top-0 left-0 z-50 backdrop-blur-lg w-[99vw] h-full">
      <div className="dark:bg-white bg-gray-800 dark:text-gray-300 mt-10 sm:mt-32 sm:w-[500px] w-full p-5 rounded-md mx-auto ">
        <img
          className="w-20 mx-auto mb-10"
          src="https://i.ibb.co/whSjqyv/fshub-account-v2-CB432205751.png"
          alt=""
        />
        <form onSubmit={handleLoginSubmit} action="">
          <span className="mt-5 block text-white dark:text-black ">Email</span>
          <label
            className="border  bg-transparent text-white dark:text-black overflow-hidden rounded flex items-center"
            htmlFor=""
          >
            <MdOutlineMail className="mx-3 text-xl w-5" />
            <input
              className="border-0 bg-transparent text-white dark:text-black w-full border-l "
              type="email"
              name="email"
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
              name="password"
              placeholder="Enter password"
            />
          </label>
          <button
            type="submit"
            className="my-2 p-2 w-full bg-blue-600 rounded text-white"
          >
            Login
          </button>
          {/* <button
            onClick={handleLoginWithGoogle}
            className="flex justify-center items-center gap-2 bg-blue-400 p-2 text-black rounded-md w-full font-semibold"
          >
            Login With Google{" "}
            <img
              className="w-8"
              src="https://img.icons8.com/?size=256&id=V5cGWnc9R4xj&format=png"
              alt="dsfsdf"
            />
          </button>
          <br /> */}
          {/* <p className="font-semibold text-white dark:text-black">
            Have not a Account ?{" "}
            <Link className="text-blue-500" to={"/register"}>
              please Register
            </Link>
          </p> */}
        </form>
      </div>
    </div>
  );
}
