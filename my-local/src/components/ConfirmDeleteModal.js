import React, { useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { UserInfo } from "./Strorage";
const ConfirmDeleteModal = ({ confirmModal, confirmDelete, confirmToogle }) => {
  const user_info = useContext(UserInfo);
  return (
    <Modal isOpen={confirmModal}>
      <ModalHeader
        cssModule={{ "modal-title": "w-100 text-center text-primary" }}
      >
        Confirmation Alert
      </ModalHeader>
      <ModalBody>
        <div>
          <div className="form-group d-flex">
            Are you sure you want to delete{" "}
            {user_info && (
              <span className="text-info text-capitalize ml-2 mr-1">
                {user_info.fname} {user_info.lname}{" "}
                <span role="img" aria-labelledby="question">
                  ❓{" "}
                </span>
              </span>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDelete}>
          Confirm
        </Button>
        <Button color="secondary" onClick={confirmToogle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDeleteModal;
