import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";

import { FaCuttlefish, FaOpencart, FaProductHunt } from "react-icons/fa6";
import { TbCoinTaka } from "react-icons/tb";
import { BsCartXFill, BsFillCartCheckFill } from "react-icons/bs";

export default function StockDetails() {
  // 🔹 DEMO STATE DATA
  const [runningOrder, setRunningOrder] = useState(12);
  const [cancelOrder, setCancelOrder] = useState(5);
  const [compleatOrderLength, setCompleatOrderLength] = useState(18);
  const [categories, setCategories] = useState(6);
  const [allProducts, setAllProducts] = useState(120);
  const [totalCompletedOrderPrice, setTotalCompletedOrderPrice] =
    useState(7800);

  // Fake loading simulation (optional)
  useEffect(() => {
    // Later you can replace with API calls
  }, []);

  // 📊 CHART DATA
  const orderChartData = [
    { name: "Completed", value: compleatOrderLength },
    { name: "Running", value: runningOrder },
    { name: "Canceled", value: cancelOrder },
  ];
  const earningLineData = [
    { month: "Aug", earning: 42000 },
    { month: "Sep", earning: 51000 },
    { month: "Oct", earning: 46500 },
    { month: "Nov", earning: 59000 },
    { month: "Dec", earning: 67000 },
    { month: "Jan", earning: totalCompletedOrderPrice },
  ];




  const productChartData = [
    { name: "Products", value: allProducts },
    { name: "Categories", value: categories },
  ];

  const earningChartData = [
    { name: "Total Earning (TK)", value: totalCompletedOrderPrice },
  ];

  const COLORS = ["#22c55e", "#d61f69", "#d60c0c", "#f59e0b"];

  return (
    <div>
      {/* ======= PIE CHART SECTION ======= */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">

        {/* Orders Pie */}
        <div className="bg-white text-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold  text-center mb-3">
            Orders Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {orderChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Products Pie */}
        <div className="bg-white text-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-center mb-3">
            Products Overview
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {productChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Earnings Line Chart */}
        <div className="bg-white text-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-center mb-3">
            Earnings ( Last 6 months )
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={earningLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="earning"
                stroke="#D61F69"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ======= SUMMARY CARDS ======= */}
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 mb-10">

        {/* Total Sell */}
        <div className="flex justify-between rounded-md bg-gradient-to-r from-green-500 to-emerald-900 border-b-[25px] border-emerald-900 px-5 py-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">Total Sell</h2>
            <h2 className="text-5xl font-bold text-white mt-4">
              {totalCompletedOrderPrice} TK
            </h2>
          </div>
          <TbCoinTaka className="text-5xl text-white" />
        </div>

        {/* Total Products */}
        <div className="flex justify-between rounded-md bg-gradient-to-r from-purple-500 to-purple-900 border-b-[25px] border-indigo-800 px-5 py-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Total Products
            </h2>
            <h2 className="text-5xl font-bold text-white mt-4">
              {allProducts}
            </h2>
          </div>
          <FaProductHunt className="text-5xl text-white" />
        </div>

        {/* Categories */}
        <div className="flex justify-between rounded-md bg-gradient-to-r from-orange-500 to-amber-900 border-b-[25px] border-amber-800 px-5 py-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">Categories</h2>
            <h2 className="text-5xl font-bold text-white mt-4">
              {categories}
            </h2>
          </div>
          <FaCuttlefish className="text-5xl text-white" />
        </div>

      </div>


      {/* ======= ORDER DETAILS ======= */}
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4">

        {/* Completed */}
        <div className="flex justify-between rounded-md bg-gradient-to-r from-pink-500 to-rose-900 border-b-[25px] border-rose-800 px-5 py-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Completed Orders
            </h2>
            <h2 className="text-5xl font-bold text-white mt-4">
              {compleatOrderLength}
            </h2>
          </div>
          <BsFillCartCheckFill className="text-5xl text-white" />
        </div>

        {/* Running */}
        <div className="flex justify-between rounded-md bg-gradient-to-r from-purple-500 to-violet-900 border-b-[25px] border-violet-800 px-5 py-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Running Orders
            </h2>
            <h2 className="text-5xl font-bold text-white mt-4">
              {runningOrder}
            </h2>
          </div>
          <FaOpencart className="text-5xl text-white" />
        </div>

        {/* Cancel */}
        <div className="flex justify-between rounded-md bg-gradient-to-r from-red-500 to-red-900 border-b-[25px] border-red-800 px-5 py-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Cancel Orders
            </h2>
            <h2 className="text-5xl font-bold text-white mt-4">
              {cancelOrder}
            </h2>
          </div>
          <BsCartXFill className="text-5xl text-white" />
        </div>

      </div>
    </div>
  );
}
 