import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoSearch } from "react-icons/io5";

export default function AllProducts() {
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [products, setProducts] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/addProducts")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const dataToDisplay = searchTerm.length ? searchData : products;
  const totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);
  const currentProducts = dataToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  // Delete product by ID
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/addProducts/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Search handler function
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length < 1) {
      setSearchData([]);
      return;
    }

    const filteredProducts = products.filter((item) =>
      item?.name?.toLowerCase().includes(term)
    );
    setSearchData(filteredProducts);
  };

  return (
    <div>
      <div className="md:flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold dark:text-white">All Products</h2>

        {/* Search Input */}
        <div className="relative border rounded-md overflow-hidden">
          <input
            className="sm:py-4 border-none w-[100vw] md:w-[500px] pr-10"
            type="text"
            placeholder="Search Here ..."
            name="search"
            onChange={handleSearch}
          />
          <IoSearch className="absolute right-3 sm:top-[30%] top-[20%] text-2xl" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-none">
        <Table hoverable className="rounded-none min-w-[900px]">
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Categories</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell className="text-right">Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentProducts.map((product, idx) => (
              <Table.Row
                key={product._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </Table.Cell>
                <Table.Cell>
                  <img className="w-20" src={product?.uploadImages} alt="" />
                </Table.Cell>
                <Table.Cell>{product?.name}</Table.Cell>
                <Table.Cell>{product?.category}</Table.Cell>
                <Table.Cell>{product?.rPrice} TK</Table.Cell>
                <Table.Cell className="flex justify-end">
                  <Link
                    to={`/all-products/${product?._id}`}
                    className="py-2 px-5 mr-2 bg-blue-600 rounded text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="p-2 mr-2 bg-red-600 rounded text-white"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 items-center space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`p-2 bg-gray-200 dark:bg-gray-600 rounded-lg ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          <FaArrowLeft />
        </button>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex + 1)}
            className={`px-3 py-2 mx-1 rounded-lg ${
              currentPage === pageIndex + 1
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
            }`}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 bg-gray-200 dark:bg-gray-600 rounded-lg ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
