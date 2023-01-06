import React, {useState, useEffect } from "react";
import Debt from "./Debt";
import axios from "../../axios";

const Content = ({users,user,setAlert}) => {

  const [debts,setDebts] = useState([])
  const [credits,setCredits] = useState([])

  useEffect(()=>{
    const getDebts = async () => {
      try {
        const res = await axios.get('/splitter/debts/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        // console.log(res)
        setDebts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    const getCredits= async () => {
      try {
        const res = await axios.get('/splitter/credits/', {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
        // console.log(res)
        setCredits(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getDebts()
    getCredits()
  },[])
  return (
    <div
      className="container debts m-auto border rounded py-3 px-3"
      style={{ maxWidth: "1100px", minHeight: "600px" }}>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true">
            Your Debts
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false">
            Pending Credits
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab">
          <div className="debts p-4 px-2">
            <h5 className="py-2"> Whom You owe:</h5>
            {debts.length==0 ? <p className="text-center border p-3 rounded">Nothing to show</p>:<></>}
            {debts.map((item)=>(<Debt type="outgoing" amount={item.amount} category={item.category} sender={item.sender} receiver={item.receiver} date={item.created_at} user={user} users={users} room={item.room}/>))}
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab">
          <div className="debts p-4 px-2">
            <h5 className="py-2"> Who owe you:</h5>
            {credits.length==0 ? <p className="text-center border p-3 rounded">Nothing to show</p>:<></>}
            {credits.map((item)=>(<Debt type="incoming" amount={item.amount} category={item.category} sender={item.sender} receiver={item.receiver} date={item.created_at} user={user} users={users} room={item.room}/>))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
