import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useCategoryStore } from "../../../store/CategoryStore/CategoryStore";
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

export default function DeleteCategory({ open, toggle, id }) {
  const { deleteCategory } = useCategoryStore();
  const removeCategory = async () => {
    const res = await deleteCategory(id);
    if (res?.status === 200) {
      window.location.reload();
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
              <button className="delete__btn-delete" onClick={removeCategory}>
                delete
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
