import { Modal, Table } from "flowbite-react";
import { useState } from "react";

export default function Review() {

    const [openModal, setOpenModal] = useState(false);

    //========= approve =======
    const handleApprove =()=>{
      swal("Approve", "Review Approve successfully !", "success")
    }

    //========= approve Delete =======
    const handleApproveDelete =()=>{
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f00",
        confirmButtonText: "Yes, Delete it!",
        closeOnConfirm: false
      },
      function(){
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
      });
    }

  return (
    <div>
      <h2 className="text-3xl font-bold dark:text-white mb-10">Review</h2>

      <div>
        <Modal className="pt-12 sm:pt-0" dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Review Details</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <div className="overflow-x-auto ">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {"Bangladeshi Software"}
              </Table.Cell>
              <Table.Cell>bs@gmail.com</Table.Cell>
              <Table.Cell>Dinajpur</Table.Cell>
              <Table.Cell>
                <button onClick={() => setOpenModal(true)} className="py-2 mb-2 md:mb-0 px-2 bg-pink-600 rounded text-white font-semibold mr-2">
                  View
                </button>
                <button onClick={handleApprove} className="py-2 mb-2 md:mb-0 px-2 bg-blue-600 rounded text-white font-semibold">
                  Approve
                </button>
                <button onClick={handleApproveDelete} className="py-2 mb-2 md:mb-0 px-2 bg-red-600 ml-2 rounded text-white font-semibold">
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {"Bangladeshi Software"}
              </Table.Cell>
              <Table.Cell>bs@gmail.com</Table.Cell>
              <Table.Cell>Dinajpur</Table.Cell>
              <Table.Cell>
                <button onClick={() => setOpenModal(true)} className="py-2 mb-2 md:mb-0 px-2 bg-pink-600 rounded text-white font-semibold mr-2">
                  View
                </button>
                <button onClick={handleApprove} className="py-2 mb-2 md:mb-0 px-2 bg-blue-600 rounded text-white font-semibold">
                  Approve
                </button>
                <button onClick={handleApproveDelete} className="py-2 mb-2 md:mb-0 px-2 bg-red-600 ml-2 rounded text-white font-semibold">
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>

            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {"Bangladeshi Software"}
              </Table.Cell>
              <Table.Cell>bs@gmail.com</Table.Cell>
              <Table.Cell>Dinajpur</Table.Cell>
              <Table.Cell>
                <button onClick={() => setOpenModal(true)} className="py-2 mb-2 md:mb-0 px-2 bg-pink-600 rounded text-white font-semibold mr-2">
                  View
                </button>
                <button onClick={handleApprove} className="py-2 mb-2 md:mb-0 px-2 bg-blue-600 rounded text-white font-semibold">
                  Approve
                </button>
                <button onClick={handleApproveDelete} className="py-2 mb-2 md:mb-0 px-2 bg-red-600 ml-2 rounded text-white font-semibold">
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>

          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
