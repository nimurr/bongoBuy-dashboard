import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import UserMenu from "./components/UserMenu";
import { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";
import { AuthContext } from "./AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";

function App() {
  const { loading } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {

    localStorage.setItem("flowbite-theme-mode", "dark");

  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <img className="w-48" src="https://res.cloudinary.com/nerob/image/upload/v1769675365/Protfolio/QNF78Uk4YE_c4bkok.gif" alt="" />
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100  items-center w-full dark:bg-[#111827] h-[100vh] fixed">
      {/* left side navbar  */}
      <ToastContainer autoClose={3000} theme="colored" position="top-right" />
      <div
        className={`lg:w-3/12 xl:w-2/12 md:w-4/12 w-10/12 lg:ml-0 ${show ? "ml-0" : "-ml-[1000px]"
          } absolute lg:relative h-[100vh] z-20 `}
      >
        <button
          onClick={handleShow}
          className="text-4xl z-[99999] dark:text-gray-200  dark:bg-gray-700 rounded  absolute lg:hidden right-5 top-6"
        >
          <IoMdClose className="" />
        </button>

        <Navbar handleShow={handleShow}></Navbar>
      </div>

      <div className="lg:w-10/12 w-full">
        {/* top navbar  */}
        <div className="relative items-center w-full h-20 md:px-10 pl-10 bg-white border-b-2 border-gray-300 dark:border-gray-800  dark:bg-[#111827] justify-between">
          <UserMenu></UserMenu>
          <button
            onClick={handleShow}
            className="text-2xl dark:text-white text-gray-800 absolute lg:hidden left-4 top-7"
          >
            <RiMenu2Line />
          </button>
        </div>

        {/* outlet  */}
        <div className="sm:p-10 p-4 h-[90vh] overflow-y-scroll">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;
