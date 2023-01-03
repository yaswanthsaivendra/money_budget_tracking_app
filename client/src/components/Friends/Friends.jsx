import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../../Sidebar'
import Content from './Content'

const Friends = () => {
  return (
    <>
    <Sidebar title="Friends" content={<Content/>} />
    </>
  )
}

export default Friends