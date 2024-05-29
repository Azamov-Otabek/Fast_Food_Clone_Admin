import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./AddFoodModal.scss";
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

export default function AddFood({ open, toggle, editItem }) {
  const { fileUpload, addProducts, updateProduct } = useProductStore();
  const [image, setImage] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(editItem?.category_id)
  const [categories, setCategories] = React.useState([])
  const {getCategory} = useCategoryStore()
  React.useEffect(()=> {
    receiveCategory()
  }, [])
  const receiveCategory = async() => {
    const response = await getCategory()
    console.log(response);
    setCategories(response?.data?.Categories)
  }
  const ImageUpload = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    const res = await fileUpload(formData);
    console.log(res);
    setImage(res?.data?.url);
  };
  const handleProduct = async (e) => {
    e.preventDefault();
    const payload = {
      picture: image ? image : editItem?.picture,
      title: e.target[1].value ? e.target[1].value : editItem?.title,
      price: +e.target[2].value ? +e.target[2].value : +editItem?.price,
      discount: +e.target[3].value ? +e.target[3].value : +editItem?.discount,
      category_id: e.target[4].value ? e.target[4].value : editItem?.category_id,
      description: e.target[5].value ? e.target[5].value : editItem?.description,
      owner_id: localStorage.getItem("owner_id")
    };
    if (editItem) {
        console.log(payload);
        const res = await updateProduct({...payload, id: editItem?.id})
        if (res?.status === 200) {
          window.location.reload()
        }
      } else {
        const res = await addProducts(payload);
        if (res?.status === 201) {
        window.location.reload()
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
          <form className="modal__body" onSubmit={handleProduct}>
            <div className="modal__image">
              <input type="file" onChange={ImageUpload} />
              <img src={image ? image : Upload} alt="upload" />
            </div>
            <div className="modal__inputs">
              <input type="text" placeholder="Title" defaultValue={editItem?.title}/>
              <input type="text" placeholder="Price" defaultValue={editItem?.price}/>
              <input type="text" placeholder="Discount" defaultValue={editItem?.discount}/>
              <select defaultValue={editItem?.category_id} value={selectedValue} onChange={()=>setSelectedValue(e.target.value)}>
                <option disabled>
                  Select Category
                </option>
                {
                  categories?.map((item,index)=> {
                    return <option value={item?.id} key={index}>{item?.name}</option>
                  })
                }
              </select>
              <textarea rows={4} placeholder="Description" defaultValue={editItem?.description}></textarea>
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
