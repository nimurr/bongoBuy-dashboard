import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";

export default function CustomerMassage() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5 dark:text-white">
        Customer Massage
      </h2>
      <div className="overflow-x-auto rounded-none">
        <Table hoverable className="rounded-none min-w-[800px]">
          <Table.Head>
            <Table.HeadCell>Customer name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Sort Message</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>Nerob</Table.Cell>
              <Table.Cell>nerob@gmail.com</Table.Cell>
              <Table.Cell>017*********</Table.Cell>
              <Table.Cell>
                {" "}
                <span>Lorem ipsum dolor sit amet It is the...</span>{" "}
              </Table.Cell>
              <Table.Cell>
                <button onClick={() => setOpenModal(true)} className="p-2 bg-primary rounded text-white dark:text-white min-w-32">
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
                      <div>
                        <span><span className="font-semibold">Email:</span> nimurnerob404@gmail.com</span>
                        <br />
                        <span><span className="font-semibold">Phone:</span> 017**********</span> 
                      </div>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        With less than a month to go before the European Union
                        enacts new consumer privacy laws for its citizens,
                        companies around the world are updating their terms of
                        service agreements to comply.
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The European Union’s General Data Protection Regulation
                        (G.D.P.R.) goes into effect on May 25 and is meant to
                        ensure a common set of data rights in the European
                        Union. It requires organizations to notify users as soon
                        as possible of high-risk data breaches that could
                        personally affect them.
                      </p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="bg-red-600" onClick={() => setOpenModal(false)}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
