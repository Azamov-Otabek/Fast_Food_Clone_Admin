import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./AddCategory.scss";
import { useWorkerStore } from "../../../store/WorkersStore/WorkersStore";
import Upload from "../../../assets/upload.avif";
import { useProductStore } from "../../../store/ProductStore/ProductStore";
import { useCategoryStore } from "../../../store/CategoryStore/CategoryStore";

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
export default function AddCategory({
  open,
  toggle,
  editItem,
  image,
  setImage,
}) {
  const { fileUpload } = useProductStore();
  const { addCategory, updateCategory } = useCategoryStore();
  const ImageUpload = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    const res = await fileUpload(formData);
    setImage(res?.data?.url);
  };
  const handleCategory = async (e) => {
    e.preventDefault();
    let payload = {
      image: image ? image : editItem?.image,
      name: e.target[1].value ? e.target[1].value : editItem?.name,
      owner_id: localStorage.getItem("owner_id"),
    };
    if (editItem) {
        const res = await updateCategory({...payload, id: editItem?.id});
        if (res?.status === 200) {
          window.location.reload();
        }
    } else {
      const res = await addCategory(payload);
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
          <form className="modal__body" onSubmit={handleCategory}>
            <div className="modal__image">
              <input type="file" onChange={ImageUpload} />
              <img src={image ? image : Upload} alt="upload" />
            </div>
            <div className="modal__inputs">
              <input
                type="text"
                placeholder="Name"
                defaultValue={editItem?.name}
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
