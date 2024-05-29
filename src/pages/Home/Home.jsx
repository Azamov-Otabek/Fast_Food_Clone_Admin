import React, { useEffect, useState } from "react";
import "./Home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Category from "../../components/Category/Category";
import FoodCard from "../../components/FoodCard/FoodCard";
import { useProductStore } from "../../store/ProductStore/ProductStore";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import AddFood from "../../components/Modals/AddFoodModal/AddFoodModal";
import { useCategoryStore } from "../../store/CategoryStore/CategoryStore";
import AddCategory from "../../components/Modals/AddCategory/AddCategory";
import DeleteCategory from "../../components/Modals/DeleteCategory/DeleteCategory";
const Home = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const { getProducts, products} = useProductStore()
  const [foods, setFoods] = useState([])
  const [categories, setCategories] = useState([])
  const {getCategory} = useCategoryStore()
  useEffect(()=> {
    receiveProducts()
    receiveCategory()
  }, [])
  const receiveProducts = async() => {
    const res = await getProducts()
    setFoods(res?.data?.products)
  }
  const receiveCategory = async() => {
    const response = await getCategory()
    console.log(response);
    setCategories(response?.data?.Categories)
  }
  const [openRightBar, setOpenRightBar] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [editItem, setEditItem] = useState("")
  const [deleteID, setDeleteID] = useState("")
  const [addCategory, setAddCategory] = useState(false)
  const [image, setImage] = useState("")
  const toggle = () => {
    setDeleteModal(false)
    setAddCategory(false)
    setOpenModal(false)
    setDeleteCategory(false)
    setEditItem("")
    setDeleteID("")
  }
  return (
    <div className="home">
      <DeleteModal open={deleteModal} toggle={toggle} id={deleteID}/>
      <DeleteCategory open={deleteCategory} toggle={toggle} id={deleteID}/>
      <AddFood open={openModal} toggle={toggle} editItem={editItem}/>
      <AddCategory open={addCategory} toggle={toggle} editItem={editItem} setImage={setImage} image={image}/>
      <div className="home__sidebar">
        <Sidebar />
      </div>
      <div className="home__center">
        <Navbar setAddCategory={setAddCategory} setOpenModal={setOpenModal}/>
        <div className="home__category">
          {categories?.map((item, index) => {
            return (
              <Category
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
                item={item}
                setAddCategory={setAddCategory}
                setEditItem={setEditItem}
                setImage={setImage}
                setDeleteID={setDeleteID}
                setDeleteCategory={setDeleteCategory}
                key={index}
              />
            );
          })}
        </div>
        <div className="home__foods">
            {
                products?.map((item,index)=> {
                    return <FoodCard key={index} item={item} setDeleteModal={setDeleteModal} setOpenModal={setOpenModal} setEditItem={setEditItem} setDeleteID={setDeleteID}/>
                })
            }
        </div>
      </div>
    </div>
  );
};

export default Home;
