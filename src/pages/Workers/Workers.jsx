import React, { useState } from "react";
import "./Workers.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import BasicTable from "../../components/Table/Table";
import AddWorker from "../../components/Modals/AddWorker/AddWorker"
const Workers = () => {
  const [addWorker, setAddWorker] = useState(false)
  return (
    <div className="workers">
      <div className="workers__sidebar">
        <Sidebar />
      </div>
      <div className="workers__right">
        <div className="workers__navbar">
          <Navbar setAddWorker={setAddWorker}/>
        </div>
        <div className="workers__table">
          <BasicTable />
        </div>
      </div>
    </div>
  );
};

export default Workers;
