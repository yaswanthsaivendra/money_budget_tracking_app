import React from "react";
import Divider from "@mui/material/Divider";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import moment from "moment";
import {Link} from 'react-router-dom'

const Debt = ({
  type,
  amount,
  date,
  category,
  sender,
  receiver,
  user,
  users,
  room
}) => {
  let formattedDate = moment(date).format("MMM D, YYYY");

  return (
    <>
      {type === "outgoing" ? (
        <div
          className="transaction px-3 border rounded"
          style={{ height: "60px" }}>
          <div className="transactionFirst">
            <p className="text-secondary m-0 text-monospace">{formattedDate}</p>
            <p className="px-1">{user.username}</p>
            <EastIcon fontSize="large" sx={{ color: "grey" }} />
            <p className="px-1">
              {users?.map((user) =>
                user.id === receiver ? <>{user.username}</> : <></>
              )}
            </p>
            <Chip label={category} />
          </div>
          <div className="transactionSecond d-flex align-items-center">
            <p className="text-danger px-2">-{amount} USD</p>
            <Link to={`/splits/${room}`} style={{ textDecoration: 'none' }}>
               <Button variant="outlined">Open Room</Button>
            </Link>
           
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
            <p className="text-secondary m-0 text-monospace">{formattedDate}</p>
            <p className="px-1">
            {users?.map((user) =>
                user.id === sender ? <>{user.username}</> : <></>
              )}
            </p>
            <WestIcon fontSize="large" sx={{ color: "grey" }} />
            <p className="px-1">{user.username}</p>
            <Chip label={category} />
          </div>
          <div className="transactionSecond d-flex align-items-center">
            <p className="text-success px-2">+{amount} USD</p>
            <Link to={`/splits/${room}`} style={{ textDecoration: 'none' }}>
               <Button variant="outlined">Open Room</Button>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Debt;
