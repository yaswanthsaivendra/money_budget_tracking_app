import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { ListItemSecondaryAction, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Chip from "@mui/material/Chip";
import Transaction from "./Transaction";
import { useEffect,useState } from "react";

const Content = ({ incomeTransactions,user,expenseTransactions }) => {


  return (
    <div className="container">
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
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab">
            <div
              className="filters rounded w-100 mb-1"
              style={{ height: "60px" }}></div>
            <Divider />

            <div className="transactions">
            {expenseTransactions.map(item=>(
              <Transaction type="expense" amount={item.amount} category={item.category} date={item.created_at} user={user} />
             ))}
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab">
            <div
              className="filters rounded w-100 mb-1"
              style={{ height: "60px" }}></div>
            <Divider />

            <div className="transactions">
              <Transaction type="transfer" />
              <Transaction type="transfer" />
              <Transaction type="transfer" />
              <Transaction type="transfer" />
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab">
            <div
              className="filters rounded w-100 mb-1"
              style={{ height: "60px" }}></div>
            <Divider />

            <div className="transactions">
             {incomeTransactions.map(item=>(
              <Transaction type="income" amount={item.amount} category={item.category} date={item.created_at} user={user} />
             ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
