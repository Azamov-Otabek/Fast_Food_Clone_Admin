import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { IoIosSearch } from "react-icons/io";
import { useProductStore } from "../../store/ProductStore/ProductStore";
import { useStore } from "zustand";


const Navbar = ({ setAddCategory, setOpenModal }) => {
  const url =  window.location.href.split("/")[3]
  const [search, setSearch] = useState('')
  const {searchProduct} = useStore(useProductStore)


  async function getData(){
    const payload = {
      limit: 50,
      owner_id: localStorage.getItem('owner_id'),
      page: 1,
      title: search,
    }
    await searchProduct(payload)
  }
  
  useEffect(() => {
    getData()
  }, [search])



  return (
    <nav className="navbar">
      <div className="navbar__left">
        <h1 className="navbar__title">Welcome, {localStorage.getItem('owner_name')} 👋</h1>
        <p className="navbar__subtitle">Discover whatever you need</p>
      </div>
      <div className="navbar__search">
        <IoIosSearch className="navbar__search-logo" size={16} />
        <input type="text" onChange={(e) => setSearch(e.target.value)} className="navbar__input" placeholder="Search" />
      </div>
      <div className={url === "workers" ? "none" : "navbar__buttons"}>
        <button className="navbar__btn" onClick={() => setOpenModal(true)}>
          Add Food
        </button>
        <button className="navbar__btn2" onClick={() => setAddCategory(true)}>
          Add Category
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
