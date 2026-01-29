import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosPrint } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../../redux/features/orders/orders";
import moment from "moment";

export default function RaningOrderDetails() {

  const { id } = useParams();
  const { data } = useGetSingleOrderQuery(id)
  const orderData = data?.data?.attributes;
  const products = data?.data?.attributes?.products;
  console.log(products)


  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  // Fetch order details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/customer-orders/${id}`)
      .then((res) => {
        setOrder(res?.data);
        setStatus(res?.data?.status || "pending");
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleBack = () => {
    window.history.back();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // Optional: Update backend status
    axios
      .patch(`http://localhost:5000/customer-orders/${id}`, { status: newStatus })
      .then((res) => console.log("Status updated", res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-10 dark:text-gray-200">
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

      {/* Status Selector */}
      <div className="flex items-center justify-end my-5">
        <label className="mr-2 font-medium dark:text-gray-300">Change Status:</label>
        <select
          className="bg-gray-800 py-1 rounded-md text-white px-2"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="placed">Placed</option>
          <option value="packeging">Packeging</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="return">Return</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Print Area */}
      <div className="print-area max-w-6xl mx-auto mt-10 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 p-6">
        <h1 className="text-2xl font-bold text-center mb-10 underline uppercase">Invoice</h1>

        {/* Products Table */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-5">Product Details</h2>
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200 dark:bg-gray-600">
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">Size</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">
                    <img
                      src={item?.productImages}
                      className="w-12 mx-auto rounded"
                      alt={item?.productName}
                    />
                  </td>
                  <td className="border p-2">{item?.productId?.name || 'N/A'}</td>
                  <td className="border p-2">{item?.productId?.size || 'N/A'}</td>
                  <td className="border p-2">{item?.quantity || 'N/A'}</td>
                  <td className="border p-2">৳{item?.productId?.price || 'N/A'} </td>
                  <td className="border p-2 font-semibold">
                    ৳{item?.price || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Grand Total */}
          <div className="flex justify-end pr-10 mt-5 text-lg font-bold">
            Grand Total: ৳{orderData?.total}
          </div>
        </div>

        {/* Customer & Seller Info */}
        <div className="p-10 grid grid-cols-2 gap-5 mt-10">
          {/* Customer Info */}
          <div className="mt-5 text-sm">
            <h2 className="text-2xl font-bold mb-5">Customer Info</h2>
            <h2 className="mb-2">
              <span className="font-semibold">Customer Name:</span> {orderData?.userName || ""}
            </h2>
            <h2 className="mb-2">
              <span className="font-semibold">Number:</span> {"0" + orderData?.phoneNumber || ""}
            </h2>
            <h2 className="mb-2">
              <span className="font-semibold">Full Address:</span> {orderData?.address || ""}
            </h2>
            <h2 className="mb-2">
              <span className="font-semibold">Order Date:</span> {moment(order?.createdAt).format("DD-MM-YYYY") || ""}
            </h2>
          </div>

          {/* Seller Info */}
          <div className="mt-5 text-sm text-right">
            <h2 className="text-2xl font-bold mb-5">Seller Info</h2>
            <h2 className="mb-2">
              <span className="font-semibold">Seller Name:</span> {order?.sellerName || "BongoBuy"}
            </h2>
            <h2 className="mb-2">
              <span className="font-semibold">Support Number:</span> {order?.sellerNumber || "017XXXXXXX"}
            </h2>
            <h2 className="mb-2">
              <span className="font-semibold">Seller Email:</span> {order?.sellerEmail || "support@bongobuy.com"}
            </h2>
            <h2 className="mb-2">
              <span className="font-semibold">Seller Address:</span> {order?.sellerAddress || "Dhaka, Bangladesh"}
            </h2>
          </div>
        </div>

        {/* Signature */}
        <div className="my-20 flex justify-end mr-10">
          <div className="inline border-dotted border-t-2 border-black dark:border-gray-200 pt-1">
            Signature Of AmarKids
          </div>
        </div>
      </div>

      {/* Print-only CSS */}
      <style jsx>{`
        @media print {
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
