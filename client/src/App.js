import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Friends from './components/Friends/Friends'
import Transactions from './components/Transactions/Transactions'
import Login from './components/Login/Login'
import Header from './components/Header/Header'
import Debts from './components/Debts/Debts'
import Splits from './components/Splits/Splits'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import * as React from 'react'
import MuiAlert from '@mui/material/Alert'
import axios from './axios'

function App() {
  const [login, setLogin] = useState(false)
  const [token, setToken] = useState('')
  const [friends, setFriends] = useState([])
  const [users, setUsers] = useState([])
  const [incomeTransactions,setIncomeTransactions] = useState([])
  const [categories, setCategories] = useState([])


  useEffect(() => {
    setToken(localStorage.getItem('token'))
    //get user info
    const getUserInformation = async () => {
      const res = await axios.get('/auth/login/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      })
      if (res.status === 200) {
        setLogin(true)
      }
      console.log(res)
    }
    //get users
    const getUsers = async () => {
      try {
        const res = await axios.get('/splitter/list-users/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        setUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    //get friends
    const getFriends = async () => {
      try {
        const res = await axios.get('/splitter/list-friends/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        setFriends(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    //get categories
    const getCategories = async () => {
      try {
        const res = await axios.get('/splitter/categories/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        setCategories(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    //get income transactions
    const getIncomeTransactions = async () => {
      try {
        const res = await axios.get('/splitter/personal-income/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        setIncomeTransactions(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    

    getUserInformation()
    getUsers()
    getFriends()
    getCategories()
    getIncomeTransactions() 
    
  }, [token])



  const [open, setOpen] = useState(false)
  const [alertDetails, setAlertDetails] = useState({
    message: '',
    color: '',
  })

  const setAlert = (message, color) => {
    setAlertDetails({ message: message, color: color })
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  return (
    <div className="App">
      <div>
        {/* <Button onClick={()=>{setAlert("bye","error")}}>Open simple snackbar</Button> */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertDetails.color}
            sx={{ width: '100%' }}
          >
            {alertDetails.message}
          </Alert>
        </Snackbar>
      </div>
      <BrowserRouter>
        <Routes>
          {login ? (
            <>
              <Route index element={<Dashboard setAlert={setAlert} categories={categories}/>} />
              {/* <Route index element={<Splits/>} /> */}
              <Route path="transactions" element={<Transactions />} />
              <Route path="friends" element={<Friends users={users} setAlert={setAlert} setFriends={setFriends} friends={friends}/>} />
              <Route path="debts" element={<Debts />} />
              <Route path="splits" element={<Splits />} />
            </>
          ) : (
            <Route
              path="*"
              element={<Login setAlert={setAlert} setToken={setToken} />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
