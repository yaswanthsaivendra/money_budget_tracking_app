import React from 'react'
import Sidebar from "../../Sidebar";
import Content from './Content';

const Debts = ({user,users,setAlert}) => {
  return (
    <Sidebar title="Debts" content={<Content user={user} users={users} setAlert={setAlert} />} />
  )
}

export default Debts