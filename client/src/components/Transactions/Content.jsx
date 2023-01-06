import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { ListItemSecondaryAction, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Chip from "@mui/material/Chip";
import Transaction from "./Transaction";
import { useEffect, useState } from "react";
import { DateRangePicker, DateRange } from "mui-daterange-picker";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const Content = ({
  incomeTransactions,
  user,
  expenseTransactions,
  transferTransactions,
  users,
}) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({startDate:(new Date('2022-01-01')),endDate:(new Date('2023-12-12'))});
  const [expenseCat, setExpenseCat] = React.useState("all");
  const [transferCat, setTransferCat] = React.useState("all")
  const [incomeCat,setIncomeCat] = React.useState("all");

  const toggle = () => setOpen(!open);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sx"));

  const expenseCategories = [
    {
      value: "all",
      label: "All Categories",
    },
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
      value: "all",
      label: "All Categories",
    },
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

  const expenseHandleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setExpenseCat(newValue);
  };
  const expenseHandleInput2 = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setTransferCat(newValue);
  };
  const expenseHandleInput3 = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setIncomeCat(newValue);
  };

  return (
    <div className="container">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl">
        <DialogContent>
          <DateRangePicker
            open={open}
            toggle={toggle}
            onChange={(range) => setDateRange(range)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose} autoFocus>
            Set
          </Button>
        </DialogActions>
      </Dialog>

      <div
        className="transactionsContainer  m-auto border rounded"
        style={{ minHeight: "600px", maxWidth: "1100px" }}>
        <ul class="nav nav-tabs mt-2 mx-2" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active text-danger"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true">
              Expenses
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link text-secondary"
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
          <li class="nav-item" role="presentation">
            <button
              class="nav-link text-success"
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
        {/* expense transactions */}
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab">

            <div className="filters rounded w-100 mb-1 p-2 d-flex align-items-center">
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<CalendarTodayIcon />}
                sx={{ py: 2 }}>
                {dateRange.startDate ? (
                  <>
                    {moment(dateRange.startDate).format("MMM D, YYYY")} -{" "}
                    {moment(dateRange.endDate).format("MMM D, YYYY")}
                  </>
                ) : (
                  <></>
                )}
              </Button>
              <TextField
                select
                style={{ margin: "5px", width: "300px" }}
                label="Select Category"
                name="expensecategory"
                defaultValue={expenseCat}
                onChange={expenseHandleInput}>
                {expenseCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <Divider />

            <div className="transactions">
              {expenseTransactions.length === 0 ? (
                <p className="text-secondary p-5 text-center">
                  Nothing to show
                </p>
              ) : (
                <></>
              )}

              {expenseTransactions.map((item) => (
                <>
                  {item.category == expenseCat &&
                  new Date(moment(item.created_at).format("YYYY-MM-DD")) >=
                    dateRange.startDate &&
                  new Date(moment(item.created_at).format("YYYY-MM-DD")) <=
                    dateRange.endDate ? (
                    <Transaction
                      type="expense"
                      amount={item.amount}
                      category={item.category}
                      date={item.created_at}
                      user={user}
                      users={users}
                    />
                  ) : (
                    <></>
                  )}
                  {expenseCat == "all" &&
                  new Date(moment(item.created_at).format("YYYY-MM-DD")) >=
                    dateRange.startDate &&
                  new Date(moment(item.created_at).format("YYYY-MM-DD")) <=
                    dateRange.endDate ? (
                    <Transaction
                      type="expense"
                      amount={item.amount}
                      category={item.category}
                      date={item.created_at}
                      user={user}
                      users={users}
                    />
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </div>
          </div>
          {/* transfer transactions */}
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab">
            <div
              className="filters rounded w-100 mb-1 p-2 d-flex align-items-center"
             >
                <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<CalendarTodayIcon />}
                sx={{ py: 2 }}>
                {dateRange.startDate ? (
                  <>
                    {moment(dateRange.startDate).format("MMM D, YYYY")} -{" "}
                    {moment(dateRange.endDate).format("MMM D, YYYY")}
                  </>
                ) : (
                  <></>
                )}
              </Button>
              <TextField
                select
                style={{ margin: "5px", width: "300px" }}
                label="Select Category"
                name="expensecategory"
                defaultValue={expenseCat}
                onChange={expenseHandleInput2}>
                {expenseCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </div>
            <Divider />

            <div className="transactions">
              {transferTransactions.length === 0 ? (
                <p className="text-secondary p-5 text-center">
                  Nothing to show
                </p>
              ) : (
                <></>
              )}
              {transferTransactions.map((item) => (
               <>
               {item.category == transferCat &&
               new Date(moment(item.created_at).format("YYYY-MM-DD")) >=
                 dateRange.startDate &&
               new Date(moment(item.created_at).format("YYYY-MM-DD")) <=
                 dateRange.endDate ? (
                 <Transaction
                   type="transfer"
                   amount={item.amount}
                   category={item.category}
                   date={item.created_at}
                   user={user}
                   users={users}
                   sender={item.sender}
                   receiver={item.receiver}
                 />
               ) : (
                 <></>
               )}
               {transferCat == "all" &&
               new Date(moment(item.created_at).format("YYYY-MM-DD")) >=
                 dateRange.startDate &&
               new Date(moment(item.created_at).format("YYYY-MM-DD")) <=
                 dateRange.endDate ? (
                 <Transaction
                   type="transfer"
                   amount={item.amount}
                   category={item.category}
                   date={item.created_at}
                   user={user}
                   users={users}
                 />
               ) : (
                 <></>
               )}
             </>
              ))}
            </div>
          </div>
          {/* income transactions */}
          <div
            class="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab">
            <div className="filters rounded w-100 mb-1 p-2 d-flex align-items-center">
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<CalendarTodayIcon />}
                sx={{ py: 2 }}>
                {dateRange.startDate ? (
                  <>
                    {moment(dateRange.startDate).format("MMM D, YYYY")} -{" "}
                    {moment(dateRange.endDate).format("MMM D, YYYY")}
                  </>
                ) : (
                  <></>
                )}
              </Button>
              <TextField
                select
                style={{ margin: "5px", width: "300px" }}
                label="Select Category"
                name="expensecategory"
                defaultValue={incomeCat}
                onChange={expenseHandleInput3}>
                {incomeCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Divider />

            <div className="transactions">
              {incomeTransactions.length === 0 ? (
                <p className="text-secondary p-5 text-center">
                  Nothing to show
                </p>
              ) : (
                <></>
              )}
              {incomeTransactions.map((item) => (
               <>
               {item.category == incomeCat &&
               new Date(moment(item.created_at).format("YYYY-MM-DD")) >=
                 dateRange.startDate &&
               new Date(moment(item.created_at).format("YYYY-MM-DD")) <=
                 dateRange.endDate ? (
                 <Transaction
                   type="income"
                   amount={item.amount}
                   category={item.category}
                   date={item.created_at}
                   user={user}
                   users={users}
                 />
               ) : (
                 <></>
               )}
               {incomeCat == "all" &&
               new Date(moment(item.created_at).format("YYYY-MM-DD")) >=
                 dateRange.startDate &&
               new Date(moment(item.created_at).format("YYYY-MM-DD")) <=
                 dateRange.endDate ? (
                 <Transaction
                   type="income"
                   amount={item.amount}
                   category={item.category}
                   date={item.created_at}
                   user={user}
                   users={users}
                 />
               ) : (
                 <></>
               )}
             </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
