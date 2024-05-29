import React from "react";
import "./Category.scss";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
const Category = ({
  item,
  setImage,
  setActiveCategory,
  activeCategory,
  setAddCategory,
  setEditItem,
  setDeleteID,
  setDeleteCategory
}) => {
  const editCategory = () => {
    setAddCategory(true);
    setEditItem(item);
    setImage(item?.image);
  };
  const deleteCategory = () => {
    setDeleteID(item?.id)
    setDeleteCategory(true)
  }
  return (
    <div
      className={
        activeCategory === item?.id ? "category__active category" : "category"
      }
      onClick={() => setActiveCategory(item?.id)}
    >
      <img src={item?.image} alt={item?.name} className="category__img" />
      <h1 className="category__title">{item?.name}</h1>
      <button className="category__btn">
        <CiEdit size={24} onClick={editCategory} />
        <MdOutlineDelete size={24} onClick={deleteCategory}/>
      </button>
    </div>
  );
};

export default Category;
