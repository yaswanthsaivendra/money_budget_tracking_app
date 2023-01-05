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
import axios from "../../axios";

// import Item from '@mui/material/Item';

const Content = ({
  setIncomeTransactions,
  setAlert,
  setExpenseTransactions,
  budget,
  setBudget,
}) => {
  const [expenseFormDetails, setExpenseFormDetails] = useState({
    expenseamount: "",
    expensecategory: "",
  });
  const [transferFormDetails, setTransferFormDetails] = useState({
    transferamount: "",
    transferfriend: "",
    transfercategory: "",
  });
  const [incomeFormDetails, setIncomeFormDetails] = useState({
    incomeamount: "",
    incomecategory: "",
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
    setIncomeFormDetails({ ...incomeFormDetails, [name]: newValue });
  };
  const expenseSubmit = async (evt) => {
    evt.preventDefault();
    let data = {
      amount: expenseFormDetails.expenseamount,
      category: expenseFormDetails.expensecategory,
    };
    console.log(data);
    try {
      const res = await axios.post("/splitter/personal-expense/", data, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      console.log(res);
      if (res.status === 201) {
        setAlert("expense successfully added", "success");
        setExpenseFormDetails({ expenseamount: "", expensecategory: "" });
      }
      //update transactions
      //get income transactions

      const getExpenseTransactions = async () => {
        try {
          const res = await axios.get("/splitter/personal-expense/", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          setExpenseTransactions(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getExpenseTransactions();
      //get budget
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
      getBudget();
    } catch (err) {
      console.log(err);
    }
  };
  const transferSubmit = async (evt) => {
    evt.preventDefault();
    let data = {
      amount: transferFormDetails.incomeamount,
      category: transferFormDetails.incomecategory,
    };
    try {
      const res = await axios.post("/splitter/personal-expense/", data, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      console.log(res);
      if (res.status === 201) {
        setAlert("expense successfully added", "success");
        setExpenseFormDetails({ expenseamount: "", expensecategory: "" });
      }
      //update transactions
      //get income transactions

      const getExpenseTransactions = async () => {
        try {
          const res = await axios.get("/splitter/personal-expense/", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          setExpenseTransactions(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getExpenseTransactions();
    } catch (err) {
      console.log(err);
    }
  };
  const incomeSubmit = async (evt) => {
    evt.preventDefault();
    let data = {
      amount: incomeFormDetails.incomeamount,
      category: incomeFormDetails.incomecategory,
    };
    try {
      const res = await axios.post("/splitter/personal-income/", data, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      console.log(res);
      if (res.status === 201) {
        setAlert("income successfully added", "success");
        setIncomeFormDetails({ incomeamount: "", incomecategory: "" });
      }
      //update transactions
      //get income transactions

      const getIncomeTransactions = async () => {
        try {
          const res = await axios.get("/splitter/personal-income/", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          setIncomeTransactions(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getIncomeTransactions();
      //get budget
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
      getBudget();
    } catch (err) {
      console.log(err);
    }
  };
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
  const incomeCategories = [
    {
      value: "employment",
      label: "Employment",
    },
    {
      value: "investment",
      label: "Investment",
    },
    {
      value: "business",
      label: "Business",
    },
    {
      value: "rental",
      label: "Rental",
    },
    {
      value: "pension",
      label: "Pension",
    },
    {
      value: "royalties",
      label: "Royalties",
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
              <p className="m-2">{budget.total_budget}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="m-2">Income:</p>
            </td>
            <td className="text-success">
              <p className="m-2">{budget.total_income}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="m-2">Exprenses:</p>
            </td>
            <td className="text-danger">
              <p className="m-2">{budget.total_expense}</p>
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
                name="expenseamount"
                defaultValue={expenseFormDetails.expenseamount}
                value={expenseFormDetails.expenseamount}
                onChange={expenseHandleInput}
              />
              <br />
              <TextField
                select
                style={{ margin: "5px" }}
                fullWidth
                label="Select Category"
                name="expensecategory"
                defaultValue=""
                onChange={expenseHandleInput}
                value={expenseFormDetails.expensecategory}>
                {expenseCategories.map((option) => (
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
                name="transferamount"
                defaultValue={transferFormDetails.transferamount}
                onChange={transferHandleInput}
              />
              <br />
              <TextField
                select
                style={{ margin: "5px" }}
                fullWidth
                label="Transfer to"
                name="transferfriend"
                defaultValue=""
                onChange={transferHandleInput}>
                {expenseCategories.map((option) => (
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
                name="transfercategory"
                defaultValue=""
                onChange={transferHandleInput}>
                {expenseCategories.map((option) => (
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
                name="incomeamount"
                defaultValue={incomeFormDetails.incomeamount}
                value={incomeFormDetails.incomeamount}
                onChange={incomeHandleInput}
              />
              <br />
              <TextField
                select
                style={{ margin: "5px" }}
                fullWidth
                label="category"
                name="incomecategory"
                defaultValue=""
                value={incomeFormDetails.incomecategory}
                onChange={incomeHandleInput}>
                {" "}
                {incomeCategories.map((option) => (
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
