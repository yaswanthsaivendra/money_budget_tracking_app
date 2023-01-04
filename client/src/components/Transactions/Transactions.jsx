import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../../Sidebar'
import Content from './Content'
const Transactions = ({incomeTransactions,user,expenseTransactions}) => {
  return (
    <>
    <Sidebar title="Transactions" content={<Content incomeTransactions={incomeTransactions} user={user} expenseTransactions={expenseTransactions} />} />
    </>
  )
}

export default Transactions