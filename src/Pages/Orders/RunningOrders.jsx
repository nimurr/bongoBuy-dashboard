import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function RunningOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // New state for filtering

  useEffect(() => {
    axios
      .get("http://localhost:5000/customer-orders")
      .then((res) =>
        setOrders(
          res?.data.filter((item) => item?.orderStatus !== "Completed").reverse()
        )
      );
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = async (id) => {
    const selectedOrder = orders.find((order) => order._id === id);

    const formData = {
      ...selectedOrder,
      orderStatus: status, // Update orderStatus with the selected status
    };

    if (selectedOrder) {
      try {
        await axios.put(`http://localhost:5000/customer-orders/${id}`, formData);
        toast.success(`Status updated to ${status}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to update order status", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    }
  };

  // Filter orders based on filterStatus
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.orderStatus === filterStatus);

  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-5 dark:text-white">Customer Orders</h2>

      {/* Filter dropdown */}
      <div className="mb-5">
        <label className="mr-2 font-medium dark:text-gray-300">Filter by Status:</label>
        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
          className="border-gray-400 py-1 rounded-md"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Delivery">Delivery</option>
          <option value="Cancel">Cancel</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-none">
        <Table hoverable className="rounded-none min-w-[800px]">
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Product Images</Table.HeadCell>
            <Table.HeadCell>Product Price</Table.HeadCell>
            <Table.HeadCell>Product Quantity</Table.HeadCell>
            <Table.HeadCell>Product Size</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Details</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredOrders.map((item, idx) => (
              <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>
                  <img className="w-10" src={item.productImages} alt="" />
                </Table.Cell>
                <Table.Cell>{item.productPrice} TK</Table.Cell>
                <Table.Cell>{item.productQuantity}</Table.Cell>
                <Table.Cell>{item.productSize}</Table.Cell>
                <Table.Cell>
                  <select
                    onChange={handleStatusChange}
                    defaultValue={item.orderStatus}
                    className={`border-gray-400 py-1 rounded-md mr-2 ${
                      item.orderStatus === "Pending" && "text-pink-500"
                    } ${item.orderStatus === "Processing" && "text-yellow-500"} ${
                      item.orderStatus === "Delivery" && "text-blue-500"
                    } ${item.orderStatus === "Completed" && "text-green-500"} ${
                      item.orderStatus === "Cancel" && "text-red-500"
                    }`}
                  >
                    <option className="text-pink-500" value="Pending">
                      Pending
                    </option>
                    <option className="text-yellow-500" value="Processing">
                      Processing
                    </option>
                    <option className="text-blue-500" value="Delivery">
                      Delivery
                    </option>
                    <option className="text-green-500" value="Completed">
                      Completed
                    </option>
                    <option className="text-red-500 font-semibold" value="Cancel">
                      Cancel
                    </option>
                  </select>
                  <button
                    onClick={() => handleSave(item._id)}
                    className="p-2 rounded-md bg-blue-700 text-white"
                  >
                    Save
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/running-order/${item._id}`}
                    className="p-2 bg-primary rounded text-white dark:text-white min-w-32 text-center block"
                  >
                    View Details
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
