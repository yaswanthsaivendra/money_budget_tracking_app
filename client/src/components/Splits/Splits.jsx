import React from 'react'
import Sidebar from '../../Sidebar'
import Content from './Content'

const Slipts = ({friends,setAlert,user,splits,setSplits}) => {
  return (
    <Sidebar title="Splits" content={<Content friends={friends} setAlert={setAlert} user={user} splits={splits} setSplits={setSplits}/>}/>
  )
}

export default Slipts