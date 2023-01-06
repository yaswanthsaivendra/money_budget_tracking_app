import React from 'react'
import { Chip } from '@mui/material'
// import {EastIcon} from '@mui/icons-material'
import {Divider} from '@mui/material'
import moment from 'moment'
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Button from "@mui/material/Button"
import axios from '../../axios'
import { useState } from 'react';

const Transaction = ({amount,category,sender,receiver,date,users,id,user,is_paid,setAlert,budget,setBudget}) => {
  const [paid,setPaid] = useState(is_paid)
    const formattedDate = moment(date).format("MMM D, YYYY");
    //pay fxn
    const payFxn= async()=>{
      if(budget.total_budget>=amount){
        const data = {is_paid:true,amount:amount,category:category,sender:sender,receiver}
        try {
          const res = await axios.put(`/splitter/transactions/${id}/`,data, {
            headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          });
          console.log(res);
          setAlert("successfully paid","success")
          setPaid(true)
          //update budget
          const getBudget = async () => {
            try {
              const res = await axios.get("/splitter/personal-budget/", {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              });
              setBudget(res.data);
            } catch (err) {
              console.log(err);
            }
          };
          getBudget()
        } catch (err) {
          console.log(err);
        }
      }
      else{
        setAlert("insufficient balance","error")
      }
      
    }


  return (
    <>
    <div className="transaction px-3" style={{ minHeight: "60px" }}>
            <div className="transactionFirst">
              <p className="text-secondary m-0 text-monospace">
                {formattedDate}
              </p>
              <p className="px-1">
              {users?.map((user) =>
                 ( user.id === sender ? <>{user.username}</> : <></>)
                )}
              </p>
              <EastIcon fontSize="large" sx={{ color: "grey" }} />
              <p className="px-1">
                {users?.map((user) =>
                  user.id === receiver ? <>{user.username}</> : <></>
                )}
              </p>
              <Chip label={category} sx={{ m: 1 }} />
            </div>
            <div className="transactionSecond d-flex align-items-center">
              <p className="text-info px-2">{amount} USD</p>
              {(user.id===sender && paid==false)?<Button variant="contained" onClick={payFxn}>Pay</Button>:<></>}
              

            </div>
          </div>
          <Divider />
    </>
  )
}

export default Transaction