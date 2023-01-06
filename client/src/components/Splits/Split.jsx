import React from "react";
import Chip from "@mui/material/Chip";
import { Divider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import moment from "moment";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem, TextareaAutosize } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import axios from "../../axios";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect ,useState} from "react";

const Split = ({
  name,
  category,
  amount,
  id,
  date,
  user,
  creator,
  initialSplit,
  expenseCategories,
  setAlert,
  friendsArray,
  setSplits,
  friends,
  splits,
  creatorId
}) => {
  // const [splitState,setSplitState] = useState(initialSplit);

  // friends.push(user)
 
  let splitters = [];
  initialSplit.splitters.forEach((splitter) => {
    friends.map((item) => {
      if (splitter == item.id) {
        splitters.push({ value: item.id, label: item.username });
      }
    });
  });
  splitters.push({ value: user.id, label: user.username });

  const [open, setOpen] = React.useState(false);
  const [split, setSplit] = React.useState({
    name: initialSplit.name,
    amount: initialSplit.amount,
    description: initialSplit.description,
    category: initialSplit.category,
    payer: initialSplit.payer,
    splitters: splitters,
  });
  const formattedDate = moment(date).format("MMM D, YYYY");
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
    splits.forEach((item)=>{
      if(item.id==id){
        initialSplit=item;
      }
    })
    splitters=[]
    initialSplit.splitters.forEach((splitter) => {
      friends.map((item) => {
        if (splitter == item.id) {
          splitters.push({ value: item.id, label: item.username });
        }
      });
    });
    // setSplit({
    //   name: initialSplit.name,
    //   amount: initialSplit.amount,
    //   description: initialSplit.description,
    //   category: initialSplit.category,
    //   payer: initialSplit.payer,
    //   splitters: splitters,
    // });
  };
  //split put
  const splitSubmit = async (evt) => {
    evt.preventDefault();
    const splitterArrayForm = [];
    split.splitters.map((splitter) => {
      splitterArrayForm.push(splitter.value);
    });
    let data = {
      name: split.name,
      amount: split.amount,
      category: split.category,
      payer: split.payer,
      splitters: splitterArrayForm,
      description: split.description,
    };
    console.log(data);
    try {
      const res = await axios.put(
        `/splitter/splitroom/${initialSplit.id}/`,
        data,
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setAlert("successfully edited", "success");
        setSplit({
          name: "",
          amount: "",
          description: "",
          category: "",
          payer: "",
          splitters: "",
        });
      }
      window.location.reload()
      //u[date splits
      const getSplits = async () => {
        try {
          const res = await axios.get("/splitter/splitroom/", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          console.log(res);
          setSplits(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getSplits();
    } catch (err) {
      console.log(err);
    }
  };

  //delete split
  const deleteSplit = async () => {
    try {
      const res = await axios.delete(
        `/splitter/splitroom/${initialSplit.id}/`,
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      );
     
        setAlert("successfully deleted", "success");
      //u[date splits
      const getSplits = async () => {
        try {
          const res = await axios.get("/splitter/splitroom/", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          console.log(res);
          setSplits(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getSplits();
    } catch {}
  };
  return (
    <>
      <div className="transaction px-3" style={{ minHeight: "60px" }}>
        <div className="transactionFirst">
          <p className="text-secondary m-0 text-monospace">{formattedDate}</p>
          <p className="px-2">{name}</p>

          <Chip label={category} sx={{ mr: 1 }} />
          <div className="d-flex align-items-center mx-2">
            <Typography color="secondary">{amount} USD</Typography>
          </div>
        </div>
        <div className="transactionSecond d-flex">
          
          {user.id === creatorId ? (
            <Button
              color="primary"
              variant="outlined"
              onClick={deleteSplit}
              sx={{ mr: 2 }}>
              Delete
            </Button>
          ) : (
            <></>
          )}
          {user.id === creatorId ? (
            <Button
              color="primary"
              variant="outlined"
              onClick={handleClickOpen}
              sx={{ mr: 2 }}>
              Edit
            </Button>
          ) : (
            <></>
          )}
          <Link to={`/splits/${id}/`} style={{ textDecoration: "none" }}>
            <Button variant="outlined">View</Button>
          </Link>
        </div>
      </div>
      <Divider />
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
                defaultValue={split.splitters}
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
            <Button onClick={handleClose} type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Split;
