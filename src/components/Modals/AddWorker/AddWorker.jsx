import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./AddWorker.scss";
import { useWorkerStore } from "../../../store/WorkersStore/WorkersStore";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddFood({ open, toggle, editItem }) {
  const { postWorker, updateWorker } = useWorkerStore();
  const handleWorker = async (e) => {
    e.preventDefault();
    const payload = {
      full_name: e.target[0].value ? e.target[0].value : editItem?.full_name,
      login_key: e.target[1].value ? e.target[1].value : editItem?.login_key,
      password: e.target[2].value ? e.target[2].value : editItem?.password,
      owner_id: localStorage.getItem("owner_id"),
    };
    console.log(payload);
    if (editItem) {
      const res = await updateWorker({...payload, id: editItem?.id});
      if (res?.status === 200) {
        window.location.reload();
      }
    } else {
      const res = await postWorker(payload);
      if (res?.status === 201) {
        window.location.reload();
      }
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
          <form className="modal__body" onSubmit={handleWorker}>
            <div className="modal__inputs">
              <input
                type="text"
                placeholder="FullName"
                defaultValue={editItem?.full_name}
              />
              <input
                type="text"
                placeholder="Login"
                defaultValue={editItem?.login_key}
              />
              <input
                type="text"
                placeholder="Password"
                defaultValue={editItem?.password}
              />
              <button className="modal__btn" type="submit">
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
