import React from "react";
import Sidebar from "../../Sidebar";
import Header from "../Header/Header";
import Content from './Content';
const Dashboard = () => {
  return (
   
    <>
      <Sidebar title="Dashboard" content={<Content/>} />
    </>
  );
};

export default Dashboard;
