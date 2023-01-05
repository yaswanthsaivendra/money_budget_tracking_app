import React from 'react'
import Sidebar from '../../Sidebar'
import Content from './Content'
const Split = ({splits,setAlert,user}) => {
  return (
    <>
     <Sidebar title="Split" content={<Content split={splits} setAlert={setAlert} user={user} />} /></>
  )
}

export default Split