import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons
import { Link } from "react-router-dom";

export default function AllProducts() {

  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of products per page

  // Sample product data (replace with real data later)
  const products = Array.from({ length: 50 }).map((_, idx) => ({
    id: idx + 1,
    name: "Product " + (idx + 1),
    image:
      "https://mohasagor.com/public/storage/images/product_thumbnail_img/thumbnail_1728107065_4046.jpg",
    category: "T-shirt",
    price: "590 TK",
    rating: 4.45,
    totalRatings: 150,
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, magni!",
  }));

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get current products for the current page
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="md:flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold dark:text-white">All Products</h2>
        <form className=" md:mt-0 mt-3">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 px-10 min-w-48 w-[350px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Products"
              required
            />
          </div>
        </form>
      </div>
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
                key={product.id || idx}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>
                  <img className="w-20" src={product.image} alt="" />
                </Table.Cell>
                <Table.Cell>
                  <span>{product.name}</span>
                </Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell className="flex justify-end">
                  <Link to={'/all-products/6714919cdaff8b0c57e55a1b'}
                    className="py-2 px-5 mr-2 bg-blue-600 rounded text-white dark:text-white"
                  >
                    Edit
                  </Link>
                  <button
                    className="p-2 mr-2 bg-red-600 rounded text-white dark:text-white"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="p-2 bg-primary rounded text-white dark:text-white"
                  >
                    View Details
                  </button>
                  <Modal
                    dismissible
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                  >
                    <Modal.Header>{product.name}</Modal.Header>
                    <Modal.Body>
                      <div className="space-y-6">
                        <span>Category: {product.category}</span>
                        <div className="w-48 mx-auto">
                          <img className="w-full" src={product.image} alt="" />
                        </div>
                        <div>
                          <h2 className="font-bold text-xl">{product.price}</h2>
                          <h2 className="font-bold">
                            <FaStar className="inline text-orange-500" />{" "}
                            {product.rating} ({product.totalRatings})
                          </h2>
                          <h2>
                            <span className="font-bold">Description :</span>{" "}
                            {product.description}
                          </h2>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="bg-red-600"
                        onClick={() => setOpenModal(false)}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 items-center space-x-4">
        {/* Left Arrow */}
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

        {/* Page Numbers */}
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

        {/* Right Arrow */}
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
