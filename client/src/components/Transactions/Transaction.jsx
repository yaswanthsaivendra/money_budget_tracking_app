import React from "react";
import Divider from "@mui/material/Divider";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Chip from "@mui/material/Chip";
import moment from "moment";

const Transaction = ({
  type,
  amount,
  category,
  date,
  user,
  users,
  sender,
  receiver,
}) => {
  const formattedDate = moment(date).format("MMM D, YYYY");

  return (
    <>
      {type == "expense" ? (
        <>
          <div className="transaction px-3" style={{ minHeight: "60px" }}>
            <div className="transactionFirst">
              <p className="text-secondary m-0 text-monospace">
                {formattedDate}
              </p>
              <p className="px-1">{user.username}</p>
              <EastIcon fontSize="large" sx={{ color: "grey" }} />
              <Chip label={category} sx={{ m: 1 }} />
            </div>
            <div className="transactionSecond">
              <p className="text-danger">-{amount} USD</p>
            </div>
          </div>
          <Divider />
        </>
      ) : (
        <></>
      )}

      {type == "transfer" && user.id == sender ? (
        <>
          <div className="transaction px-3" style={{ minHeight: "60px" }}>
            <div className="transactionFirst">
              <p className="text-secondary m-0 text-monospace">
                {formattedDate}
              </p>
              <p className="px-1">{user.username}</p>
              <EastIcon fontSize="large" sx={{ color: "grey" }} />
              <p className="px-1">
                {users.map((user) =>
                  user.id === receiver ? <>{user.username}</> : <></>
                )}
              </p>
              <Chip label={category} sx={{ m: 1 }} />
            </div>
            <div className="transactionSecond">
              <p className="text-danger">-{amount} USD</p>
            </div>
          </div>
          <Divider />
        </>
      ) : (
        <></>
      )}
      {type == "transfer" && user.id == receiver ? (
        <>
          <div className="transaction px-3" style={{ minHeight: "60px" }}>
            <div className="transactionFirst">
              <p className="text-secondary m-0 text-monospace">
                {formattedDate}
              </p>
              <p className="px-1">
              {users.map((user) =>
                  user.id === sender ? <>{user.username}</> : <></>
                )}
                </p>
              <WestIcon fontSize="large" sx={{ color: "grey" }} />
              <p className="px-1">
              {user.username}
              </p>
              <Chip label={category} sx={{ m: 1 }} />
            </div>
            <div className="transactionSecond">
              <p className="text-success">+{amount} USD</p>
            </div>
          </div>
          <Divider />
        </>
      ) : (
        <></>
      )}

      {type == "income" ? (
        <>
          <div className="transaction px-3" style={{ minHeight: "60px" }}>
            <div className="transactionFirst">
              <p className="text-secondary m-0 text-monospace">
                {formattedDate}
              </p>
              <p className="px-1">{user.username}</p>
              <WestIcon fontSize="large" sx={{ color: "grey" }} />
              <Chip label={category} sx={{ m: 1 }} />
            </div>
            <div className="transactionSecond">
              <p className="text-success">+{amount} USD</p>
            </div>
          </div>
          <Divider />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Transaction;
