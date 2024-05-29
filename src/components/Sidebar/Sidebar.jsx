import React, { useState } from 'react'
import "./Sidebar.scss"
import Logo from "../../assets/logo.png"
import { LiaHomeSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaUsers } from "react-icons/fa6";

const Sidebar = () => {
  const [sidebarLink, setSidebarLink] = useState([
    {icon: <LiaHomeSolid size={24}/>, path: "/home"},
    {icon: <FaUsers size={26}/>, path: "/workers"},
    // {icon: <IoSettingsOutline size={24}/>, path: "/settings"},
  ])
  const url = "/" + window.location.href.split("/")[3]
  return (
    <aside className='sidebar'>
      <div className="sidebar__logo">
        <img src={Logo} alt="logo" />
      </div>
      <ul className='sidebar__list'>
        {
          sidebarLink?.map((item,index)=> {
            return <li key={index}>
              <Link to={item?.path} className={item?.path === url ? "sidebar__link-active" : 'sidebar__link'}>{item?.icon}</Link>
            </li>
          })
        }
      </ul>
    </aside>
  )
}

export default Sidebar
