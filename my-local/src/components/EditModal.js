import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const EditModal = ({
  handleEdit,
  modal,
  closeToogle,
  selectedUsrId,
  onSave,
}) => {
  return (
    <Modal isOpen={modal}>
      <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
        Edit User
      </ModalHeader>
      <ModalBody>
        {selectedUsrId && (
          <div>
            <div className="form-group d-flex">
              <input
                type="text"
                name="firsName"
                className="form-control"
                placeholder="Enter First Name"
                value={selectedUsrId.fname}
                onInput={(e) => handleEdit({ fname: e.target.value })}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={selectedUsrId.lname}
                onInput={(e) => handleEdit({ lname: e.target.value })}
                className="form-control ml-2"
              />
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSave}>
          OK
        </Button>
        <Button color="secondary" onClick={closeToogle}>
          Cancle
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditModal;
