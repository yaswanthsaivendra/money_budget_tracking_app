import React from 'react'
import { Button } from '@mui/material'


const Content = ({splits,setAlert,user}) => {
  return (
    <>
       <div class="container">
      <div
        className="friendsContainer border rounded p-3 py-5 m-auto text-start"
        style={{ maxWidth: "1100px", minHeight: "600px" }}>
        <div className="d-flex justify-content-between pb-3">
          <h5 className="mx-5">Title</h5>
          <div
            className="mx-5"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            <Button variant="contained">Pay</Button>
          </div>
        </div>
        </div>
        </div>
    </>
 
  )
}

export default Content