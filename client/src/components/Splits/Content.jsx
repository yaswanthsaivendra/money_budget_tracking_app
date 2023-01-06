import React from "react";
import Button from "@mui/material/Button";
import Split from "./Split";
import { Divider, MenuItem, TextareaAutosize } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "../../axios";
import { useEffect } from "react";

const Content = ({ friends, setAlert,user,splits,setSplits}) => {
  const [open, setOpen] = React.useState(false);
  const [split, setSplit] = React.useState({
    name: "",
    amount: "",
    description: "",
    category: "",
    payer: "",
    splitters: "",
  });
  //form handle
  const splitHandleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setSplit({ ...split, [name]: newValue });
  };
  //model
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //data arrays
  const friendsArray = [];
  friends.map((item) => {
    friendsArray.push({ value: item.id, label: item.username });
  });
  friendsArray.push({value:user.id,label:user.username});
  const expenseCategories = [
    {
      value: "entertainment",
      label: "Entertainment",
    },
    {
      value: "food",
      label: "Food",
    },
    {
      value: "travelling",
      label: "Travelling",
    },
    {
      value: "groceries",
      label: "Groceries",
    },
    {
      value: "medical",
      label: "Medical",
    },
    {
      value: "education",
      label: "Education",
    },
    {
      value: "clothing",
      label: "Clothing",
    },
  ];

  

  //split post
  const splitSubmit = async (evt) => {
    evt.preventDefault();
    const splitterArrayForm = []
    split.splitters.map((splitter)=>{
      splitterArrayForm.push(splitter.value);
    })
    let data = {
      name: split.name,
      amount: split.amount,
      category: split.category,
      payer:split.payer,
      splitters:splitterArrayForm,
      description: split.description
    };
    console.log(data);
    try {
      const res = await axios.post("/splitter/splitroom/", data, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      console.log(res);
      if (res.status === 201) {
        setAlert("transfer successful", "success");
        setSplit({
         name: "",
         amount: "",
         description: "",
         category: "",
         payer: "",
         splitters: "",
       });
      }
      //u[date splits
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
      getSplits()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div
        className="friendsContainer border rounded py-4 m-auto text-start"
        style={{ maxWidth: "1100px", minHeight: "600px" }}>
        <div className="d-flex justify-content-between pb-3">
          <h5 className="mx-3">Your Splits</h5>
          <div className="mx-3">
            <Button variant="contained" onClick={handleClickOpen}>
              Add Split
            </Button>
          </div>
        </div>
        <div className="transactions">
          <Divider />
          {splits.map((split)=>{
            return(
               <><Split amount={split.amount} category={split.category} id={split.id} date={split.created_at} name={split.name} creator={split.creator} user={user} initialSplit={split} expenseCategories={expenseCategories} setAlert={setAlert} friendsArray={friendsArray} setSplits={setSplits} friends={friends} splits={splits} creatorId={split.creator}/></>
            )
          })}
          
          
        </div>
      </div>
      {/* add split model */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ minWidth: "500px" }}>Add Split</DialogTitle>
        <form onSubmit={splitSubmit}>
        <DialogContent>
          
            <TextField
              style={{ margin: "5px" }}
              fullWidth
              type="text"
              label="Name"
              variant="outlined"
              name="name"
              defaultValue={split.name}
              value={split.name}
              onChange={splitHandleInput}
            />
            <TextField
              style={{ margin: "5px" }}
              fullWidth
              type="number"
              label="Amount"
              variant="outlined"
              name="amount"
              defaultValue={split.amount}
              value={split.amount}
              onChange={splitHandleInput}
            />
            <div className="p-1">
              <TextareaAutosize
                style={{
                  width: "102%",
                  padding: "10px",
                  border: "1px solid gray",
                  borderRadius: "5px",
                }}
                rowsMin={5}
                type="text"
                label="Description"
                variant="outlined"
                name="description"
                placeholder="Enter your description here"
                defaultValue={split.description}
                value={split.description}
                onChange={splitHandleInput}
              />
            </div>
            <TextField
              select
              style={{ margin: "5px" }}
              fullWidth
              label="Select Category"
              name="category"
              onChange={splitHandleInput}
              value={split.category}>
              {expenseCategories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              style={{ margin: "5px" }}
              fullWidth
              label="Select Payer"
              name="payer"
              defaultValue=""
              onChange={splitHandleInput}
              value={split.payer}
              MenuProps={{
                empty: (
                  <MenuItem disabled>
                    <em>No Friends available</em>
                  </MenuItem>
                ),
              }}>
              {friendsArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <div className="m-1">
              <Autocomplete
                multiple
                style={{
                  width: "102%",
                }}
                id="tags-standard"
                options={friendsArray}
                getOptionLabel={(option) => option.label}
                defaultValue={[]}
                //   value={split.splitters}
                onChange={(e, v) => {
                  const name = "splitters";
                  setSplit({ ...split, [name]: v });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Splitters"
                    placeholder="Add splitters"
                    // name="splitters"
                    // value={split.splitters}
                  />
                )}
              />
            </div>

            <br />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type="submit">Add</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Content;
