import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosPrint } from "react-icons/io";
import { useParams } from "react-router-dom";

export default function RaningOrderDetails() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/customer-orders/${id}`)
      .then((res) => setOrders(res?.data));
  }, [id]);

  const handleBack = () => {
    window.history.back();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-10 dark:text-gray-200 ">
      {/* Back and Print Buttons */}
      <div className="flex justify-between mb-10">
        <button
          onClick={handleBack}
          className="bg-black text-white font-semibold py-2 px-8 rounded-md"
        >
          Back
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white font-semibold py-2 px-8 rounded-md"
        >
          <IoIosPrint className="inline mr-2" /> Print Invoice
        </button>
      </div>

      {/* Print Area */}
      <div className="print-area border border-gray-300 rounded-lg bg-white dark:bg-gray-700">
        {orders?.map((item, idx) => (
          <div key={idx} className=" p-6 mb-6">
            <h1 className="text-2xl font-bold text-center mb-10 underline uppercase">Invoice</h1>
            <div className="text-sm">

              <div className="flex gap-5 p-5 justify-between border-2 rounded-xl border-gray-200  items-center w-full">
                <img
                  className="w-14 rounded-full"
                  src={item?.productImages}
                  alt=""
                />
                <h2 className=" mb-2 text-center">
                  <span className="font-bold">Product Name <br /></span>{" "}
                  {item?.productName}
                </h2>
                <h2 className=" mb-2 text-center">
                  <span className="font-bold">Total Price <br /></span>{" "}
                  {item?.productPrice} TK
                </h2>
                <h2 className=" mb-2 text-center">
                  <span className="font-bold">Product Quantity <br /></span>{" "}
                  {item?.productQuantity}
                </h2>
                <h2 className=" mb-2 text-center">
                  <span className="font-bold">Product Size <br /></span>{" "}
                  {item?.productSize}
                </h2>
              </div>
            </div>
          </div>
        ))}
        <hr />
        <div className="p-10 grid grid-cols-2 gap-5">
          <div className="mt-5 text-sm ">
            <h2 className="text-2xl font-bold mb-5">Customer Info</h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Customer Name:</span>{" "}
              {orders[0]?.fullName}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Number:</span> {orders[0]?.number}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Email:</span> {orders[0]?.email}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Full Address:</span>{" "}
              {orders[0]?.fullAddress}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Delivery Area:</span>{" "}
              {orders[0]?.deliveryArea}
            </h2>
          </div>
          <div
            className="mt-5 text-sm text-right
"
          >
            <h2 className="text-2xl font-bold mb-5">Seller Info</h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Seller Name:</span>{" "}
              {orders[0]?.fullName}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Support Number:</span>{" "}
              {orders[0]?.number}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Seller Email:</span>{" "}
              {orders[0]?.email}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Seller Address:</span>{" "}
              {orders[0]?.fullAddress}
            </h2>
          </div>
        </div>

        <div className="my-20 flex justify-end mr-10 ">
          <div className="inline border-dotted border-t-2 border-black dark:border-gray-200 pt-1">
            Signature Of BongoBuy
          </div>
        </div>
      </div>

      {/* Print-only CSS */}
      <style jsx>{`
        @media print {
          /* Hide everything except print-area */
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
