import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import UserMenu from "./components/UserMenu";
import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiMenu2Line } from "react-icons/ri";
import { AuthContext } from "./AuthProvider/AuthProvider";

function App() {
  const { loading } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <img className="w-32" src="https://res.cloudinary.com/nerob/image/upload/v1729153381/BongoBuy/vjrj5chnn35depdimlhs.gif" alt="" />
      </div>
      // <div className="flex justify-center items-center w-full my-[40vh]">
      //   <div role="status">
      //     <svg
      //       aria-hidden="true"
      //       className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
      //       viewBox="0 0 100 101"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      //         fill="currentColor"
      //       />
      //       <path
      //         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      //         fill="currentFill"
      //       />
      //     </svg>
      //     <span className="sr-only">Loading...</span>
      //   </div>
      // </div>
    );
  }

  return (
    <div className="flex bg-gray-100 items-center w-full dark:bg-[#111827] h-[100vh] fixed">
      {/* left side navbar  */}
      <div
        className={`lg:w-3/12 xl:w-2/12 md:w-4/12 w-10/12 lg:ml-0 ${
          show ? "ml-0" : "-ml-[1000px]"
        } absolute lg:relative h-[100vh] z-20 `}
      >
        <button
          onClick={handleShow}
          className="text-4xl z-[999999999] dark:text-gray-200  dark:bg-gray-700 rounded absolute lg:hidden right-5 top-6"
        >
          <IoMdClose className="" />
        </button>

        <Navbar></Navbar>
      </div>

      <div className="lg:w-10/12 w-full">
        {/* top navbar  */}
        <div className="relative items-center w-full h-20 md:px-10 pl-10 bg-white border-b-2 border-gray-300 dark:border-gray-800  dark:bg-[#111827] justify-between">
          <UserMenu></UserMenu>
          <button
            onClick={handleShow}
            className="text-2xl dark:text-white absolute lg:hidden left-4 top-7"
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
