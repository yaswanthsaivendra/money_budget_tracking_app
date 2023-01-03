import React from "react";
import Divider from "@mui/material/Divider";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Chip from "@mui/material/Chip";

const Debt = ({ type }) => {
  return (
    <>
      {type === "outgoing" ? (
        <div
          className="transaction px-3 border rounded"
          style={{ height: "60px" }}>
          <div className="transactionFirst">
            <p className="text-secondary m-0 text-monospace">Dec 31</p>
            <p className="px-1">neha</p>
            <EastIcon fontSize="large" sx={{ color: "grey" }} />
            <p className="px-1">rachana</p>
            <Chip label="Dmart shopping" />
          </div>
          <div className="transactionSecond">
            <p className="text-danger">-90.00 USD</p>
          </div>
        </div>
      ) : (
        <></>
      )}
            {type === "incoming" ? (
        <div
          className="transaction px-3 border rounded"
          style={{ height: "60px" }}>
          <div className="transactionFirst">
            <p className="text-secondary m-0 text-monospace">Dec 31</p>
            <p className="px-1">neha</p>
            <WestIcon fontSize="large" sx={{ color: "grey" }} />
            <p className="px-1">rachana</p>
            <Chip label="Dmart shopping" />
          </div>
          <div className="transactionSecond">
            <p className="text-success">+90.00 USD</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Debt;
