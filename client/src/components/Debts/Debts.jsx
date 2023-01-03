import React from 'react'
import Sidebar from "../../Sidebar";
import Content from './Content';

const Debts = () => {
  return (
    <Sidebar title="Debts" content={<Content/>} />
  )
}

export default Debts