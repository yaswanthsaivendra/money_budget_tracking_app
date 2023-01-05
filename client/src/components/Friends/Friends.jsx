import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../../Sidebar'
import Content from './Content'

const Friends = ({users,setAlert,setFriends,friends,user}) => {
  return (
    <>
    <Sidebar title="Friends" content={<Content user={user} users={users} setAlert={setAlert} setFriends={setFriends} friends={friends}/>} />
    </>
  )
}

export default Friends