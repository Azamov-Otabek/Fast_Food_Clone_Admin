import React from 'react'
import "./FoodCard.scss"
import { FaStar } from "react-icons/fa";
// import { AiOutlinePlus } from "react-icons/ai";
import NoImage from "../../assets/noimage.png"
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const FoodCard = ({item, setDeleteModal, setOpenModal, setEditItem, setDeleteID}) => {
  const editProduct = () => {
    setOpenModal(true)
    setEditItem(item)
  }
  const deleteProduct = () => {
    setDeleteID(item?.id)
    setDeleteModal(true)
  }
  return (
    <div className='food'>
      <div className="food__img">
        <img src={item?.picture ? item?.picture : NoImage} alt={item?.title} />
      </div>
      <h1 className="food__title">{item?.title}</h1>
      <p className="food__desc">{item?.description}</p>
      <div className="food__rate">
        <FaStar className='food__star-full'/>
        <FaStar className='food__star-full'/>
        <FaStar className='food__star-full'/>
        <FaStar className='food__star-full'/>
        <FaStar className='food__star-cream'/>
        <p>{item?.rate}</p>
      </div>
      <h1 className="food__price">{item?.price}</h1>
      <button className="food__action">
        <MdOutlineDelete size={24} onClick={deleteProduct}/>
        <CiEdit size={24} onClick={editProduct}/>
        </button>
    </div>
  )
}

export default FoodCard
