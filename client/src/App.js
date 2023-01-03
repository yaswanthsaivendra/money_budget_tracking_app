import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Friends from './components/Friends/Friends'
import Transactions from './components/Transactions/Transactions'
import Login from './components/Login/Login'
import Header from './components/Header/Header'
import Debts from './components/Debts/Debts'
import Splits from './components/Splits/Splits'
import { useState,useEffect } from 'react'



function App() {
  const [login, setLogin] = useState(false)
  useEffect(() => {
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

    getUserInformation();
},[])
  return (
    <div className="App">
     
      <BrowserRouter>
        <Routes>
          {login ? (
            <>
              <Route index element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="friends" element={<Friends />} />
              <Route path="debts" element={<Debts />} />
              <Route path="splits" element={<Splits />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
