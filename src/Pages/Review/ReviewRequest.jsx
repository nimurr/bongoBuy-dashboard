import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import { useApproveAdminMutation, useGetAllReviewsQuery } from "../../redux/features/reviews/reviews";
import { FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function ReviewRequest() {
  const { data } = useGetAllReviewsQuery();
  const reviews = data?.data?.attributes || [];
  const [approveReview] = useApproveAdminMutation();

  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleView = (review) => {
    setSelectedReview(review);
    setOpenModal(true);
  };

  const handleAccept = async (review) => {
    // later → call approve API here
    const id = review._id;

    try {
      const res = await approveReview(id).unwrap();
      console.log(res)
      if (res?.code == 200) {
        toast.success('Review Approved Successfully');
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5 dark:text-white">
        Review Request
      </h2>

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Customer Name</Table.HeadCell>
            <Table.HeadCell>Rating</Table.HeadCell>
            <Table.HeadCell>Review</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {reviews.map((item) => (
              <Table.Row
                key={item._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  {item.userId?.fullName || "Unknown"}
                </Table.Cell>

                <Table.Cell>{item.rating}</Table.Cell>

                <Table.Cell className="max-w-xs truncate">
                  {item.message}
                </Table.Cell>

                <Table.Cell>
                  {item.isAdminApproved ? (
                    <span className="text-green-500">Approved</span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </Table.Cell>

                <Table.Cell className="flex gap-2">
                  {!item.isAdminApproved && (
                    <button
                      onClick={() => handleAccept(item)}
                      className="px-3 py-1 bg-blue-600 rounded text-white"
                    >
                      Accept
                    </button>
                  )}

                  <button
                    onClick={() => handleView(item)}
                    className="px-3 py-1 bg-primary rounded text-white"
                  >
                    View
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* ================= VIEW MODAL ================= */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Review Details</Modal.Header>

        <Modal.Body>
          {selectedReview && (
            <div className="space-y-4 text-white">
              <p className="flex items-center justify-between my-2 ">
                <b>Customer:</b>{" "}
                {selectedReview.userId?.fullName}
              </p>

              <p className="flex items-center justify-between my-2 ">
                <b>Rating:</b><span className="flex items-center gap-2"><FaStar className="text-orange-500" /> {selectedReview.rating}</span>
              </p>

              <p className="flex items-center justify-between my-2 ">
                <b>Product ID:</b> {selectedReview.productId}
              </p>

              <p>
                <b>Review Message:</b>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedReview.message}
              </p>

              <p className="text-sm text-gray-400">
                Submitted:{" "}
                {new Date(selectedReview.createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
