import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../../Sidebar'
import Content from './Content'

const Friends = ({users}) => {
  return (
    <>
    <Sidebar title="Friends" content={<Content users={users}/>} />
    </>
  )
}

export default Friends