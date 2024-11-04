import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CustomerMassage() {
 

  const [message , setMessage ] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/customer-message')
    .then(res => setMessage(res?.data.reverse()))
  },[])

  console.log(message)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5 dark:text-white">
        Customer Massage
      </h2>
      <div className="overflow-x-auto rounded-none">
        <Table hoverable className="rounded-none min-w-[800px]">
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Customer name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Sort Message</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              message?.map((item, idx )=> 
                <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{++idx}</Table.Cell>
              <Table.Cell>{item?.name}</Table.Cell>
              <Table.Cell>{item?.email}</Table.Cell>
              <Table.Cell>{item?.phone}</Table.Cell>
              <Table.Cell>
                {" "}
                <span>{item?.message.slice(0,20)}...</span>{" "}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/customer-message/${item?._id}`} className="p-2 bg-primary rounded text-white dark:text-white min-w-32 text-center block ">
                  View Details
                </Link> 
              </Table.Cell>
            </Table.Row>)
            }
            
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
