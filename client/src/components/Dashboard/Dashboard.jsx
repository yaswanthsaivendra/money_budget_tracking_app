import React from "react";
import Sidebar from "../../Sidebar";
import Header from "../Header/Header";
import Content from './Content';
const Dashboard = ({setAlert,categoires,setIncomeTransactions,setExpenseTransactions}) => {
  return (
   
    <>
      <Sidebar title="Dashboard" content={<Content setAlert={setAlert} categoires={categoires} setIncomeTransactions={setIncomeTransactions} setExpenseTransactions={setExpenseTransactions}/>} />
    </>
  );
};

export default Dashboard;
