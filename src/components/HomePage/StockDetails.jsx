import { FaOpencart, FaUsers } from "react-icons/fa6";
import { TbCoinTaka } from "react-icons/tb";

export default function StockDetails() {


  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-5 dark:text-white flex justify-between">
          Stock Amount & Details{" "}
        </h2>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2  lg:gap-4 gap-2">
          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Total Sell
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">
                1500000 TK
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
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">150</h2>
            </div>
            <div>
              <TbCoinTaka  className="text-5xl   text-white"></TbCoinTaka>
            </div>
          </div>

          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Catagories
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">10</h2>
            </div>
            <div>
              <TbCoinTaka  className="text-5xl  text-white"></TbCoinTaka>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-5 dark:text-white flex justify-between">
          Orders Details{" "}
        </h2>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2  lg:gap-4 gap-2">
          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Completed Orders
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">30</h2>
            </div>
            <div>
              <FaOpencart className="text-5xl   text-white"></FaOpencart>
            </div>
          </div>
          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Running Orders
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">10</h2>
            </div>
            <div>
              <FaOpencart  className="text-5xl   text-white"></FaOpencart>
            </div>
          </div>
          <div className="w-full flex justify-between h-auto rounded-md bg-primary border-b-[25px] border-[#0ba338] px-5 sm:py-5 py-2 ">
            <div>
              <h2 className="sm:text-2xl font-semibold text-gray-50">
                Cancel Orders
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">2</h2>
            </div>
            <div>
              <FaOpencart  className="text-5xl   text-white"></FaOpencart>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
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
                Total Users
              </h2>
              <h2 className="text-5xl font-semibold text-gray-50 mt-5">10</h2>
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
      </div>

    </div>
  );
}
