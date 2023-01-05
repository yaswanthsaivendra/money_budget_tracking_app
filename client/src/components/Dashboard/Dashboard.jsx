import React from "react";
import Sidebar from "../../Sidebar";
import Header from "../Header/Header";
import Content from './Content';
const Dashboard = ({setAlert,categoires,setIncomeTransactions,setExpenseTransactions,budget,setTransferTransactions,setBudget,users,user}) => {
  return (
   
    <>
      <Sidebar title="Dashboard" content={<Content setAlert={setAlert} categoires={categoires} setIncomeTransactions={setIncomeTransactions} setExpenseTransactions={setExpenseTransactions} budget={budget} setBudget={setBudget} setTransferTransactions={setTransferTransactions} users={users} user={user}/>} />
    </>
  );
};

export default Dashboard;
