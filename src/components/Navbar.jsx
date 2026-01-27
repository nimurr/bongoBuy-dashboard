import { Link, NavLink } from "react-router-dom";
import { SiSlides } from "react-icons/si";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import {
  FaCartPlus,
  FaProductHunt,
  FaUserPlus,
} from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineSecurity, MdStars } from "react-icons/md";
import { TbShoppingCartCheck } from "react-icons/tb";
import { RiMessage2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Navbar() {

  const [runningOrder, setRunningOrder] = useState(0);
  const [compleatOrder, setCompleatOrder] = useState(0)
  const [customerMessage, setCustomerMessage] = useState(0)
  const [reviewRequest, setReviewRequest] = useState(0)
  const [allProducts, setAllProducts] = useState(0)


  useEffect(() => {
    axios.get('http://localhost:5000/customer-orders')
      .then(res => setRunningOrder(res.data?.filter(item => item?.orderStatus !== "Completed").length))

    axios.get('http://localhost:5000/customer-orders')
      .then(res => setCompleatOrder(res.data?.filter(item => item?.orderStatus == "Completed").length))


    axios.get('http://localhost:5000/customer-message')
      .then(res => setCustomerMessage(res.data?.length))

    axios.get('http://localhost:5000/allReviews')
      .then(res => setReviewRequest(res.data?.length))


    axios.get('http://localhost:5000/addProducts')
      .then(res => setAllProducts(res.data?.length))

  }, [])

  console.log(compleatOrder)


  return (
    <div className="h-[100vh] relative overflow-y-auto w-full flex flex-col justify-between bg-white z-50 dark:bg-[#111827] border-r border-gray-300 dark:border-gray-800 px-2 py-6">
      {/* top nav item  */}
      <div className="">
        <Link to={"/"} className="text-4xl font-extrabold text-gray-800 dark:text-white">
          Bongo<span className="text-primary">Buy</span>
        </Link>
        <div className="mt-5">
          <ul className="">
            <NavLink
              to={"/"}
              className="my-1 flex gap-2 items-center font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="text-2xl  rounded-lg group-hover:text-red-500 text-gray-800 dark:text-white">
                <IoHomeOutline />
              </div>
              Dashboard
            </NavLink>
            <NavLink
              to={"/running-order"}
              className="my-1 flex gap-2 rounded-lg items-center justify-between font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="flex gap-2 items-center">
                <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                  <FaCartPlus />
                </div>
                Running Orders{" "}
              </div>
              <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                {runningOrder ? runningOrder : 0}
              </span>
            </NavLink>
            <NavLink
              to={"/completed-order"}
              className="my-1 flex gap-2  rounded-lg justify-between items-center font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="flex gap-2 items-center">
                <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                  <TbShoppingCartCheck />
                </div>
                Completed Orders{" "}
              </div>
              <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                {compleatOrder ? compleatOrder : 0}
              </span>
            </NavLink>

            {/* <NavLink
              to={"/customer-message"}
              className="my-1 flex gap-2 justify-between items-center font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="flex gap-2 items-center">
                <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                  <RiMessage2Fill />
                </div>
                Customer Message{" "}
              </div>
              <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                {customerMessage ? customerMessage : 0}
              </span>
            </NavLink> */}
            <NavLink
              to={"/review-request"}
              className="my-1 flex gap-2  rounded-lg justify-between items-center font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="flex gap-2 items-center">
                <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                  <MdStars />
                </div>
                Review Request{" "}
              </div>
              <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                {reviewRequest ? reviewRequest : 0}
              </span>
            </NavLink>

            <NavLink
              to={"/add-products"}
             className="my-1 flex gap-2  rounded-lg justify-between items-center font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="flex gap-2 items-center">
                <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                  <FaProductHunt />
                </div>
                All Products{" "}
              </div>
              <span className="w-7 h-7 text-xs text-white flex justify-center items-center bg-red-600 rounded-full">
                {allProducts ? allProducts : 0}
              </span>
            </NavLink>

            <NavLink
              to={"/add-catagories"}
              className="my-1 flex gap-2  rounded-lg items-center font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <IoMdAddCircleOutline />
              </div>
              Add Catagories
            </NavLink>

            <NavLink
              to={"/slider-images"}
              className="my-1 flex gap-2  rounded-lg items-center font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <SiSlides />
              </div>
              Slider Images
            </NavLink>

            <NavLink
              to={"/settings"}
              className="my-1 flex gap-2  rounded-lg items-center font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <IoSettingsOutline />
              </div>
              Settings
            </NavLink>

            <NavLink
              to={"/add-admin"}
              className="my-1 flex gap-2  rounded-lg items-center font-semibold text-gray-800 dark:text-white p-2"
            >
              <div className="text-2xl group-hover:text-red-500 text-gray-800 dark:text-white">
                <MdOutlineSecurity />
              </div>
              Admins
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
