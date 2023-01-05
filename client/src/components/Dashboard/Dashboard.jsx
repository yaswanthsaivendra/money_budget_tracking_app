import React from "react";
import Sidebar from "../../Sidebar";
import Header from "../Header/Header";
import Content from './Content';
const Dashboard = ({setAlert,categoires,setIncomeTransactions,setExpenseTransactions,budget,setBudget}) => {
  return (
   
    <>
      <Sidebar title="Dashboard" content={<Content setAlert={setAlert} categoires={categoires} setIncomeTransactions={setIncomeTransactions} setExpenseTransactions={setExpenseTransactions} budget={budget} setBudget={setBudget}/>} />
    </>
  );
};

export default Dashboard;
