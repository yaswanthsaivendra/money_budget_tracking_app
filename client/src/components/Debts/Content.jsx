import React from "react";
import Divider from "@mui/material/Divider";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Chip from "@mui/material/Chip";
import Debt from "./Debt";

const Content = () => {
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
            <Debt type="outgoing" />
            <Debt type="outgoing" />
            <Debt type="outgoing" />
            <Debt type="outgoing" />
            <Debt type="outgoing" />
            <Debt type="outgoing" />
            <Debt type="outgoing" />
            <Debt type="outgoing" />
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab">
          <div className="debts p-4 px-2">
            <h5 className="py-2"> Who owe you:</h5>
            <Debt type="incoming" />
            <Debt type="incoming" />
            <Debt type="incoming" />
            <Debt type="incoming" />
            <Debt type="incoming" />
            <Debt type="incoming" />
            <Debt type="incoming" />
            <Debt type="incoming" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
