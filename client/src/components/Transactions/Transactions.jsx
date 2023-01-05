import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../../Sidebar'
import Content from './Content'
const Transactions = ({incomeTransactions,user,expenseTransactions,transferTransactions,users}) => {
  return (
    <>
    <Sidebar title="Transactions" content={<Content incomeTransactions={incomeTransactions} user={user} expenseTransactions={expenseTransactions} transferTransactions={transferTransactions} users={users}/>} />
    </>
  )
}

export default Transactions