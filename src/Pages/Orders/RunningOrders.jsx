import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function RunningOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);

  console.log(status);

  useEffect(() => {
    axios
      .get("http://localhost:5000/customer-orders")
      .then((res) =>
        setOrders(res?.data.filter((item) => item?.orderStatus !== "Completed"))
      );
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = async (id) => {
    const selectedOrder = orders.find((order) => order._id === id);

    console.log(selectedOrder?.deliveryArea);

    const formData = {
      deliveryArea: selectedOrder?.deliveryArea,
      email: selectedOrder?.email,
      fullAddress: selectedOrder?.fullAddress,
      fullName: selectedOrder?.fullName,
      number: selectedOrder?.number,
      productImages: selectedOrder?.productImages,
      orderStatus: status,
      productName: selectedOrder?.productName,
      productPrice: selectedOrder?.productPrice,
      productQuantity: selectedOrder?.productQuantity,
      productSize: selectedOrder?.productSize,
      status: selectedOrder?.status,
    };

    if (selectedOrder) {
      try {
        await axios.put(
          `http://localhost:5000/customer-orders/${id}`,
          formData
        );
        toast.success(`Status is ${status}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }); 

      } catch (error) {
        console.error(error); 
        toast.error(`Failed to update order status`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }); 
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-5 dark:text-white">
        Customer Orders
      </h2>
      <div className="overflow-x-auto rounded-none">
        <Table hoverable className="rounded-none min-w-[800px]">
          <Table.Head>
            <Table.HeadCell>Product Images</Table.HeadCell>
            <Table.HeadCell>Product Price</Table.HeadCell>
            <Table.HeadCell>Product Quantity</Table.HeadCell>
            <Table.HeadCell>Product Size</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Details</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders?.map((item, idx) => (
              <Table.Row
                key={idx}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <img className="w-10" src={item?.productImages} alt="" />{" "}
                </Table.Cell>
                <Table.Cell>{item?.productPrice}TK</Table.Cell>
                <Table.Cell>{item?.productQuantity}</Table.Cell>
                <Table.Cell>{item?.productSize}</Table.Cell>
                <Table.Cell>
                  <select
                    onChange={handleStatusChange}
                    defaultValue={item?.orderStatus}
                    className={`border-gray-400 py-1 rounded-md mr-2 
                      ${item?.orderStatus == "Pending" && "text-pink-500"}
                      ${item?.orderStatus == "Processing" && "text-yellow-500"}
                      ${item?.orderStatus == "Delivery" && "text-blue-500"}
                      ${item?.orderStatus == "Completed" && "text-green-500"}
                      ${item?.orderStatus == "Cancel" && "text-red-500"}
                      
                      
                      `}
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
                    <option className="text-red-500 font-semibold" value="Completed">
                      Cancel
                    </option>
                  </select>
                  <button
                    onClick={() => handleSave(item._id)}
                    className="p-2 rounded-md bg-blue-700 text-white "
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
