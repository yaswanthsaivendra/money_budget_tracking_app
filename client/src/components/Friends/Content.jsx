import React from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react-router-dom";
const Content = () => {
  const [friend, setFriend] = React.useState('');
  // handle friend submit
  const friendSubmit = (evt) => {
    evt.preventDefault();

    let data = { friend };

    fetch("https://pointy-gauge.glitch.me/api/form", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log("Success:", JSON.stringify(response)))
      .catch((error) => console.error("Error:", error));
  };
  
  function createData(id, name, email) {
    return { id, name, email };
  }
  const rows = [
    createData(1, "Neha", "nehadeekonda9849@gmail.com"),
    createData(2, "Rachana", "rachana@gmail.com"),
    createData(3, "karishma", "nehadeekonda9849@gmail.com"),
    createData(4, "Neha", "kyathi@gmail.com"),
  ];
  const usersList = [
    { label: "Neha", value: "Neha" },
    { label: "The Godfather", value: "god father" },
  ];
  return (
    <div class="container">
      <div
        className="friendsContainer border rounded p-3 py-5 m-auto text-start"
        style={{ maxWidth: "1100px", minHeight: "600px" }}>
        
        <div className="d-flex justify-content-between pb-3">
        <h5 className="mx-5">Your Friends:</h5>
          <div className="mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <Button variant="contained" >
              Add Friend
            </Button>
          </div>
        </div>
        <div className="friends">
         
          <div className="border rounded mx-5 my-3">
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">
                        <Button variant="outlined">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      {/* add friend model */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Friend
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={usersList}
                value={friend}
                onChange={(e,val)=>{setFriend(val);}}
                
                renderInput={(params) => (
                  <TextField {...params} label="Choose a user" />
                )}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <Button variant="contained" onClick={friendSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
