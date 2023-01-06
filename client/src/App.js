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
import Split from './components/Split/Split'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

function App() {
  const [login, setLogin] = useState(false)
  const [token, setToken] = useState('')
  const [friends, setFriends] = useState([])
  const [users, setUsers] = useState([])
  const [incomeTransactions, setIncomeTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [user, setUser] = useState({})
  const [expenseTransactions, setExpenseTransactions] = useState([])
  const [budget, setBudget] = useState({})
  const [transferTransactions, setTransferTransactions] = useState([])
  const [splits, setSplits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    //get user info
    const getUserInformation = async () => {
      const res = await axios.get('/auth/login/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      })
      if (res.status === 200) {
        setLogin(true)
        setUser(res.data)
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
    //get expense transactions
    const getExpenseTransactions = async () => {
      try {
        const res = await axios.get('/splitter/personal-expense/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        setExpenseTransactions(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    //get transfer transactions
    const getTransferTransactions = async () => {
      try {
        const res = await axios.get('/splitter/transactions/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        setTransferTransactions(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    //get budget
    const getBudget = async () => {
      try {
        const res = await axios.get('/splitter/personal-budget/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        setBudget(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    //get splits
    const getSplits = async () => {
      try {
        const res = await axios.get('/splitter/splitroom/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        console.log(res)
        setSplits(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getUserInformation()
    getUsers()
    getFriends()
    getIncomeTransactions()
    getExpenseTransactions()
    getTransferTransactions()
    getBudget()
    getSplits()
    setTimeout(() => setLoading(false), 1000)
    // setLoading(false)
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
      {loading ? (
        <div className="laoder">
          <Backdrop
            sx={{
              color: '#1976d2',
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <>
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
                  {/* Dashboard */}
                  <Route
                    index
                    element={
                      <Dashboard
                        budget={budget}
                        setAlert={setAlert}
                        categories={categories}
                        user={user}
                        setIncomeTransactions={setIncomeTransactions}
                        setExpenseTransactions={setExpenseTransactions}
                        setTransferTransactions={setTransferTransactions}
                        setBudget={setBudget}
                        users={users}
                      />
                    }
                  />
                  {/* transactions */}
                  <Route
                    path="transactions"
                    element={
                      <Transactions
                        incomeTransactions={incomeTransactions}
                        expenseTransactions={expenseTransactions}
                        user={user}
                        transferTransactions={transferTransactions}
                        users={users}
                      />
                    }
                  />
                  {/* friends */}
                  <Route
                    path="friends"
                    element={
                      <Friends
                        users={users}
                        setAlert={setAlert}
                        setFriends={setFriends}
                        friends={friends}
                        user={user}
                      />
                    }
                  />
                  {/* debts */}
                  <Route
                    path="debts"
                    element={
                      <Debts user={user} users={users} setAlert={setAlert} />
                    }
                  />
                  {/* splits */}
                  <Route
                    path="splits"
                    element={
                      <Splits
                        friends={friends}
                        setAlert={setAlert}
                        user={user}
                        splits={splits}
                        setSplits={setSplits}
                      />
                    }
                  />
                  <Route
                    path="splits/:id"
                    element={
                      <Split
                        splits={splits}
                        setAlert={setAlert}
                        user={user}
                        users={users}
                        budget={budget}
                        setBudget={setBudget}
                      />
                    }
                  />
                </>
              ) : (
                <Route
                  path="*"
                  element={<Login setAlert={setAlert} setToken={setToken} />}
                />
              )}
            </Routes>
          </BrowserRouter>
        </>
      )}
    </div>
  )
}

export default App
