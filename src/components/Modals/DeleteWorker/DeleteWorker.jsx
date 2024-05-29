import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useWorkerStore } from "../../../store/WorkersStore/WorkersStore";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function DeleteWorker({ open, toggle, id }) {
  const { deleteWorker } = useWorkerStore();
  const removeWorker = async () => {
    const res = await deleteWorker(id);
    if (res?.status === 200) {
      toast.success('Worker deleted successfully')
      setTimeout(() => {
        window.location.reload();
      }, 1400);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="delete__body">
            <h1 className="delete__title">Are you sure?</h1>
            <div className="delete__buttons">
              <button className="delete__btn-cancel" onClick={toggle}>
                cancel
              </button>
              <button className="delete__btn-delete" onClick={removeWorker}>
                delete
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
