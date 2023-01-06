import React from 'react'
import Sidebar from '../../Sidebar'
import Content from './Content'
const Split = ({splits,setAlert,user,users,budget}) => {
  return (
    <>
     <Sidebar title="Split" content={<Content splits={splits} setAlert={setAlert} user={user} users={users} budget={budget}/>} /></>
  )
}

export default Split