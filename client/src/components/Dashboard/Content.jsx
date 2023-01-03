import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";

// import Item from '@mui/material/Item';
const Content = () => {
  const [expenseFormDetails, setExpenseFormDetails] = useState({
    amount: 0,
    category: "Food",
  });
  const [transferFormDetails, setTransferFormDetails] = useState({
    amount: 0,
    friend: "Food",
    category: "Food",
  });
  const [incomeFormDetails, setIncomeFormDetails] = useState({
    amount: 0,
    category: "Food",
  });

  const expenseHandleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setExpenseFormDetails({ ...expenseFormDetails, [name]: newValue });
  };
  const transferHandleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setTransferFormDetails({ ...transferFormDetails, [name]: newValue });
  };
  const incomeHandleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setIncomeFormDetails({ ...expenseFormDetails, [name]: newValue });
  };
  const expenseSubmit = (evt) => {
    evt.preventDefault();

    let data = { expenseFormDetails };

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
  const transferSubmit = (evt) => {
    evt.preventDefault();

    let data = { transferFormDetails };

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
  const incomeSubmit = (evt) => {
    evt.preventDefault();

    let data = { incomeFormDetails };

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
  const categories = [
    {
      value: "Food",
      label: "Food",
    },
    {
      value: "Travel",
      label: "Travel",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];
  return (
    <div className="dashboard container content">
      <div className="details">
        <div className="m-2">
          <Typography variant="h6">Account Details:</Typography>
        </div>
        <table>
          <tr>
            <td>
              <Typography>
                <p className="m-2">Net Amount:</p>
              </Typography>
            </td>
            <td>
              <p className="m-2">3000</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="m-2">Income:</p>
            </td>
            <td className="text-success">
              <p className="m-2">9449</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="m-2">Exprenses:</p>
            </td>
            <td className="text-danger">
              <p className="m-2">300</p>
            </td>
          </tr>
        </table>
        <br />
        {/* <Divider /> */}
      </div>
      <div className="formcontainer">
        <div className="m-2">
          <Typography variant="h6">New Transaction:</Typography>
        </div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active text-danger"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true">
              Expense
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link text-secondary"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false">
              Transfer
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link text-success"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false">
              Income
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active p-5"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab">
            {/* expense form */}
            <form onSubmit={expenseSubmit}>
              <TextField
                style={{ margin: "5px" }}
                fullWidth
                type="number"
                label="amount"
                variant="outlined"
                name="amount"
                defaultValue={expenseFormDetails.amount}
                onChange={expenseHandleInput}
              />
              <br />
              <TextField
                select
                style={{ margin: "5px" }}
                fullWidth
                label="Select Category"
                name="category"
                defaultValue="Food"
                onChange={expenseHandleInput}>
                
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Add Expense
              </Button>
            </form>
          </div>
          <div
            className="tab-pane fade p-5"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab">
            {/* transfer form */}
            <form onSubmit={transferSubmit}>
              <TextField
                style={{ margin: "5px" }}
                fullWidth
                type="number"
                label="amount"
                variant="outlined"
                name="amount"
                defaultValue={transferFormDetails.amount}
                onChange={transferHandleInput}
              />
              <br />
              <TextField
                select
                style={{ margin: "5px" }}
                fullWidth
                label="Transfer to"
                name="friend"
                defaultValue="Food"
                onChange={transferHandleInput}>
               
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                select
                style={{ margin: "5px" }}
                fullWidth
                label="Select Category"
                name="category"
                defaultValue="Food"
                onChange={transferHandleInput}>
                
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Transfer
              </Button>
            </form>
          </div>
          <div
            className="tab-pane fade p-5"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab">
            <form onSubmit={incomeSubmit}>
              <TextField
                style={{ margin: "5px" }}
                fullWidth
                type="number"
                label="amount"
                variant="outlined"
                name="amount"
                defaultValue={incomeFormDetails.amount}
                onChange={incomeHandleInput}
              />
              <br />
              <TextField
                select
                style={{ margin: "5px" }}
                fullWidth
                label="Transfer to"
                name="category"
                defaultValue={incomeFormDetails.category}
                onChange={incomeHandleInput}>
                {" "}
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Add Income
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
