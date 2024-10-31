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
    <div className="p-10">
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
         <IoIosPrint className="inline mr-2" />   Print Invoice
        </button>
      </div>

      {/* Print Area */}
      <div className="print-area border border-gray-300 rounded-lg">
        {orders?.map((item, idx) => (
          <div key={idx} className="  p-6 mb-6">
            <h1 className="text-2xl font-bold text-center mb-10">Invoice</h1>
            <div className="grid grid-cols-2 gap-10">
              <img
                className="w-[50%] mx-auto"
                src={item?.productImages}
                alt=""
              />
              <div>
                <h2 className="text-xl mb-2">
                  <span className="font-semibold">Product Name:</span>{" "}
                  {item?.productName}
                </h2>
                <h2 className="text-xl mb-2">
                  <span className="font-semibold">Total Price:</span>{" "}
                  {item?.productPrice} TK
                </h2>
                <h2 className="text-xl mb-2">
                  <span className="font-semibold">Product Quantity:</span>{" "}
                  {item?.productQuantity}
                </h2>
                <h2 className="text-xl mb-2">
                  <span className="font-semibold">Product Size:</span>{" "}
                  {item?.productSize}
                </h2>
              </div>
            </div>
          </div>
        ))}
        <hr />
        <div className="p-10 grid grid-cols-2 gap-5">
          <div className="mt-5">
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
          <div className="mt-5">
            <h2 className="text-2xl font-bold mb-5">Seller Info</h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Seller Name:</span>{" "}
              {orders[0]?.fullName}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Support Number:</span> {orders[0]?.number}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Seller Email:</span> {orders[0]?.email}
            </h2>
            <h2 className=" mb-2">
              <span className="font-semibold">Seller Address:</span>{" "}
              {orders[0]?.fullAddress}
            </h2> 
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
