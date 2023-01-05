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
import axios from "../../axios";
import { useRef } from "react";

const Content = ({ users, setAlert, setFriends, friends, user }) => {
  const modalRef = useRef();
  const [friend, setFriend] = React.useState("");
  // add friend
  const friendSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const res = await axios.post(
        "/splitter/add-friend/",
        { id: friend.value },
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      );
      console.log(res);
      setAlert(res.data.message, "success");

      //update friends list
      const getFriends = async () => {
        try {
          const res = await axios.get("/splitter/list-friends/", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          setFriends(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    } catch (err) {
      console.log(err);
      setAlert("something went wrong", "error");
    }
  };
  //delete frnd
  const deleteFriend = async (id) => {
    try {
      const res = await axios.post(
        "/splitter/delete-friend/",
        { id: id },
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      );
      setAlert(res.data.message, "success");

      //update friends list
      const getFriends = async () => {
        try {
          const res = await axios.get("/splitter/list-friends/", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          setFriends(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    } catch (err) {
      console.log(err);
      setAlert("something went wrong", "error");
    }
  };

  function createData(id, name, email, userid) {
    return { id, name, email, userid };
  }
  const rows = [];
  friends.forEach((frnd, id) => {
    rows.push(createData(id + 1, frnd.username, frnd.email, frnd.id));
  });
  const usersList = [];
  users.forEach((item) => {
    if (item.id != user.id) {
      let friendBool = false;
      friends.forEach((frnd) => {
        if (frnd.id === item.id) {
          friendBool = true;
        }
      });
      if (!friendBool) {
        usersList.push({ label: item.username, value: item.id });
      }
    }
  });

  return (
    <div class="container">
      <div
        className="friendsContainer border rounded p-3 py-5 m-auto text-start"
        style={{ maxWidth: "1100px", minHeight: "600px" }}>
        <div className="d-flex justify-content-between pb-3">
          <h5 className="mx-5">Your Friends</h5>
          <div
            className="mx-5"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            <Button variant="contained">Add Friend</Button>
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
                        <Button
                          variant="outlined"
                          onClick={() => {
                            deleteFriend(row.userid);
                          }}>
                          Delete
                        </Button>
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
        aria-hidden="true"
        ref={modalRef}>
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
                onChange={(e, val) => {
                  setFriend(val);
                }}
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
              <Button variant="contained" onClick={friendSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
