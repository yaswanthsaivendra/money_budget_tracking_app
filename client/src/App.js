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
import Button from "@mui/material/Button"
import  Snackbar  from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import MuiAlert from '@mui/material/Alert';


function App() {
  const [login, setLogin] = useState(false)
  const [token,setToken] = useState("")
  useEffect(() => {
    setToken(localStorage.getItem("token"))
    const getUserInformation = async () => {
      
      //check whether the user is logged in or not
      // try {
      //     if(Cookies.get('token')){
      //         userLogin(dispatch,true);
      //         const userRole = await getUserRole()
      //         const {role} = userRole.data.userData;
      //         adminLogin(dispatch,role)
      //         if(role==="user") {
      //             const data = await GetUser();
      //             userDetails(dispatch,data.profile)
      //         }
      //         // check for user role
      //     }
      // } catch (error) {
      //     console.log(error.response.data.message)
      // }
    }

    // getUserInformation()
    
  }, [])
  const [open, setOpen] = useState(false);
  const [alertDetails,setAlertDetails]=useState({
    message:"",
    color:""
  });

  const setAlert = (message,color) => {
    setAlertDetails({message:message,color:color})
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="App">
       <div>
      {/* <Button onClick={()=>{setAlert("bye","error")}}>Open simple snackbar</Button> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertDetails.color} sx={{ width: '100%' }}>
          {alertDetails.message}
        </Alert>
      </Snackbar>
    </div>
      <BrowserRouter>
        <Routes>
          {token ? (
            <>
              <Route index element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="friends" element={<Friends />} />
              <Route path="debts" element={<Debts />} />
              <Route path="splits" element={<Splits />} />
            </>
          ) : (
            <Route path="*" element={<Login setAlert={setAlert} setToken={setToken}/>} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
