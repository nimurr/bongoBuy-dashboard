import { Link, NavLink } from "react-router-dom";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { FaCartArrowDown, FaCartPlus, FaProductHunt, FaUserPlus } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdMovieEdit, MdStars } from "react-icons/md";
import { TbShoppingCartCheck } from "react-icons/tb";
import { RiMessage2Fill } from "react-icons/ri";
export default function Navbar() {
  return (
    <div className="h-[105vh] relative overflow-y-scroll w-full flex flex-col justify-between bg-white z-50 dark:bg-[#111827] border-r-2 border-gray-300 dark:border-gray-800 px-2 py-6">
      {/* top nav item  */}
      <div className="">
        <Link to={"/"} className="text-4xl font-extrabold dark:text-white">
          Bongo<span className="text-primary">Buy</span>
        </Link>
        <div className="mt-5">
          <ul className="">
            <NavLink
              to={"/"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <IoHomeOutline />
              </div>
              Dashboard
            </NavLink>
            <NavLink
              to={"/running-order"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <FaCartPlus />
              </div>
              Running Orders{" "}
              <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                5
              </span>
            </NavLink>
            <NavLink
              to={"/completed-order"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <TbShoppingCartCheck />
              </div>
              Completed Orders{" "}
              <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                99+
              </span>
            </NavLink>

            <NavLink
              to={"/customer-message"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <RiMessage2Fill />
              </div>
              Customer Message{" "}
              <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                99+
              </span>
            </NavLink>
            <NavLink
              to={"/review-request"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <MdStars />
              </div>
              Review Request{" "}
              <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                10+
              </span>
            </NavLink>

            <NavLink
              to={"/all-products"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <FaProductHunt />
              </div>
              All Products <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                99+
              </span>
            </NavLink>

            <NavLink
              to={"/add-products"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <IoMdAddCircleOutline />
              </div>
              Add Products
            </NavLink>

            <NavLink
              to={"/add-catagories"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <IoMdAddCircleOutline />
              </div>
              Add Catagories
            </NavLink>

            <NavLink
              to={"/settings"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <IoSettingsOutline />
              </div>
              Setting
            </NavLink>
            <NavLink
              to={"/pages-setting"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <MdMovieEdit />
              </div>
              Pages
            </NavLink>

            <NavLink
              to={"/add-admin"}
              className="my-1 flex gap-2 items-center font-semibold dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <FaUserPlus />
              </div>
              Admins
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
