import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CompetedOrders() {
  const [orders, setOrders] = useState([]); 
 

  useEffect(() => {
    axios
      .get("http://localhost:5000/customer-orders")
      .then((res) => setOrders(res?.data.filter(item => item?.orderStatus == "Completed")).reverse());
  }, []);

  console.log(orders)

  return <div>
    
    <div className="overflow-x-auto rounded-none">
        <Table hoverable className="rounded-none min-w-[800px]">
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Product Image</Table.HeadCell>
            <Table.HeadCell>Product Price</Table.HeadCell>
            <Table.HeadCell>Product Quantity</Table.HeadCell>
            <Table.HeadCell>Product Size</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders?.map((item, idx) => (
              <Table.Row
                key={idx}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                
                <Table.Cell>{++idx}</Table.Cell>
                <Table.Cell>
                  <img className="w-10" src={item?.productImages} alt="" />{" "}
                </Table.Cell>
                <Table.Cell>{item?.productPrice}TK</Table.Cell>
                <Table.Cell>{item?.productQuantity}</Table.Cell>
                <Table.Cell>{item?.productSize}</Table.Cell>
                <Table.Cell className="text-green-500">
                 Order {item?.orderStatus}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
  </div>;
}
