import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useGetAllOrdersQuery } from "../../redux/features/orders/orders";
import Url from "../../redux/baseApi/forImageUrl";

export default function RunningOrders() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllOrdersQuery({
    status,
    page,
    limit,
  });

  const orders = data?.data?.attributes?.results || [];
  const pagination = data?.data?.attributes?.pagination;

  console.log(data?.data?.attributes)

  // Reset page when status changes
  useEffect(() => {
    setPage(1);
  }, [status]);

  return (
    <div>
      <ToastContainer />

      {/* Header + Filter */}
      <div className="flex items-center justify-between gap-5 flex-wrap mb-5">
        <h2 className="text-2xl font-semibold dark:text-white">
          Customer Orders
        </h2>

        <div>
          <label className="mr-2 font-medium dark:text-gray-300">
            Filter by Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-gray-800 py-1 rounded-md"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table hoverable className="min-w-[800px]">
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Qty</Table.HeadCell>
            <Table.HeadCell>Order Date </Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Details</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {isLoading ? (
              <Table.Row>
                <Table.Cell colSpan={7} className="text-center">
                  Loading...
                </Table.Cell>
              </Table.Row>
            ) : orders.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={7} className="text-center">
                  No orders found
                </Table.Cell>
              </Table.Row>
            ) : (
              orders?.map((item, idx) => {
                const product = item.products[0];

                return (
                  <Table.Row key={item._id} className="bg-white dark:bg-gray-800">
                    <Table.Cell>
                      {(page - 1) * limit + idx + 1}
                    </Table.Cell>

                    <Table.Cell>
                      <img
                        className="w-10"
                        src={`${Url}${product.productId.image}`}
                        alt={product.productId.name}
                      />
                    </Table.Cell>

                    <Table.Cell>{product.productId.name}</Table.Cell>

                    <Table.Cell>{product.price} TK</Table.Cell>
                    <Table.Cell>{product.quantity}</Table.Cell>
                    <Table.Cell>{} </Table.Cell>

                    <Table.Cell>
                      <span
                        className={`px-2 py-1 rounded text-white text-sm
                          ${item.status === "pending"
                            ? "bg-yellow-500"
                            : item.status === "processing"
                              ? "bg-blue-500"
                              : item.status === "delivered"
                                ? "bg-green-500"
                                : "bg-red-500"
                          }`}
                      >
                        {item.status}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <Link
                        to={`/running-order/${item._id}`}
                        className="px-3 py-1 bg-primary rounded text-white block text-center"
                      >
                        View
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-1 border !bg-primary text-white rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(pagination.totalPages)].map((_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-4 py-1 border rounded
                  ${page === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                  }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-1 border rounded !bg-primary text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
