import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../../Sidebar'
import Content from './Content'

const Transactions = () => {
  return (
    <>
    <Sidebar title="Transactions" content={<Content/>} />
    </>
  )
}

export default Transactions