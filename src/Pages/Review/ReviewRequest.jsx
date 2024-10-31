import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ReviewRequest() {
  const [openModal, setOpenModal] = useState(false);

  const [review, setReview] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allReviews")
      .then((res) => setReview(res?.data));
  }, []);

  console.log(review);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5 dark:text-white">
        Review Request
      </h2>
      <div className="overflow-x-auto rounded-none">
        <Table hoverable className="rounded-none min-w-[650px]">
          <Table.Head>
            <Table.HeadCell>Customer name</Table.HeadCell>
            <Table.HeadCell>Review Rating</Table.HeadCell>
            <Table.HeadCell>Sort Review</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {review?.map((item, idx) => (
              <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{item?.userName}</Table.Cell>
                <Table.Cell>{item?.review}</Table.Cell>
                <Table.Cell>
                  {" "}
                  <span>{item?.message}</span>{" "}
                </Table.Cell>
                <Table.Cell>
                  <button className="p-2 bg-blue-600 mr-2 rounded text-white dark:text-white">
                    Accept
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
                    <Modal.Header>Nerob</Modal.Header>
                    <Modal.Body>
                      <div className="space-y-6">
                        <span className="text-xl font-semibold mb-5">
                          Review Content :{" "}
                        </span>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          With less than a month to go before the European Union
                          enacts new consumer privacy laws for its citizens,
                          companies around the world are updating their terms of
                          service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          The European Union’s General Data Protection
                          Regulation (G.D.P.R.) goes into effect on May 25 and
                          is meant to ensure a common set of data rights in the
                          European Union. It requires organizations to notify
                          users as soon as possible of high-risk data breaches
                          that could personally affect them.
                        </p>
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
    </div>
  );
}
