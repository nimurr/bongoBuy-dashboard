import axios from "axios";
import { useEffect, useState } from "react";
import { FaCuttlefish, FaOpencart, FaProductHunt, FaUsers } from "react-icons/fa6";
import { TbCoinTaka } from "react-icons/tb";
import { BsCartXFill, BsFillCartCheckFill } from "react-icons/bs";


export default function StockDetails() {
  const [runningOrder, setRunningOrder] = useState(0);
  const [cancelOrder, setCancelOrder] = useState(0);
  const [compleatOrder, setCompleatOrder] = useState([]);
  const [compleatOrderLength, setCompleatOrderLength] = useState([]);
  const [customerMessage, setCustomerMessage] = useState(0);
  const [reviewRequest, setReviewRequest] = useState(0);
  const [categories, setCategories] = useState(0);
  const [allProducts, setAllProducts] = useState(0);

  // console.log(reviewRequest)

  useEffect(() => {
    axios.get("http://localhost:5000/customer-orders").then((res) => {
      const orders = res.data || [];
      setRunningOrder(
        orders.filter((item) => item?.orderStatus !== "Completed" && item?.orderStatus !== "Cancel").length
      );
      setCompleatOrder(
        orders.filter((item) => item?.orderStatus === "Completed")
      );

      setCompleatOrderLength(
        orders.filter((item) => item?.orderStatus === "Completed").length
      );
      setCancelOrder(
        orders.filter((item) => item?.orderStatus === "Cancel").length
      );
    });

    axios
      .get("http://localhost:5000/customer-message")
      .then((res) => setCustomerMessage(res.data?.length || 0));

    axios
      .get("http://localhost:5000/allReviews")
      .then((res) => setReviewRequest(res.data?.length || 0));

    axios
      .get("http://localhost:5000/all-categories")
      .then((res) => setCategories(res.data?.length || 0));

    axios
      .get("http://localhost:5000/addProducts")
      .then((res) => setAllProducts(res.data?.length || 0));
  }, []);

  const totalCompletedOrderPrice = compleatOrder.reduce(
    (total, order) => total + (order.productPrice || 0),
    0
  );

  console.log(totalCompletedOrderPrice);

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-white flex justify-between">
          Stock Amount & Details{" "}
        </h2>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2  lg:gap-4 gap-2">
          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Total Sell
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">
                {totalCompletedOrderPrice ? totalCompletedOrderPrice : "00"} TK
              </h2>
            </div>
            <div>
              <TbCoinTaka className="text-5xl  text-white"></TbCoinTaka>
            </div>
          </div>

          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Total Products
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">{allProducts ? allProducts : "00"}</h2>
            </div>
            <div>
              <FaProductHunt className="text-5xl   text-white"></FaProductHunt>
            </div>
          </div>

          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Catagories
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">{categories}</h2>
            </div>
            <div>
              <FaCuttlefish className="text-5xl  text-white"></FaCuttlefish>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-white flex justify-between">
          Orders Details{" "}
        </h2>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2  lg:gap-4 gap-2">
          <div className="w-full flex justify-between h-auto rounded-md bg-pink-600 border-b-[25px] border-pink-400 px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Completed Orders
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">{compleatOrderLength}</h2>
            </div>
            <div>
              <BsFillCartCheckFill className="text-5xl   text-white"></BsFillCartCheckFill>
            </div>
          </div>
          <div className="w-full flex justify-between h-auto rounded-md bg-purple-600 border-b-[25px] border-purple-400 px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Running Orders
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">{runningOrder}</h2>
            </div>
            <div>
              <FaOpencart className="text-5xl   text-white"></FaOpencart>
            </div>
          </div>
          <div className="w-full flex justify-between h-auto rounded-md bg-red-700 border-b-[25px] border-red-400 px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Cancel Orders
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">{cancelOrder}</h2>
            </div>
            <div>
              <BsCartXFill className="text-5xl   text-white"></BsCartXFill>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mb-10">
        <h2 className="text-3xl font-bold mb-5 dark:text-white flex justify-between">
          Others Details{" "}
        </h2>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2  lg:gap-4 gap-2">
          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Total Admins
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">30</h2>
            </div>
            <div>
              <FaUsers className="text-5xl   text-white"></FaUsers>
            </div>
          </div> 
          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Total Reviews
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">{}</h2>
            </div>
            <div>
              <FaUsers className="text-5xl   text-white"></FaUsers>
            </div>
          </div> 
          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Active Users
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">2</h2>
            </div>
            <div>
              <FaUsers className="text-5xl   text-white"></FaUsers>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
