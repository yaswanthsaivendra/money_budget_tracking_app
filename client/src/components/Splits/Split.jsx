import React from "react";
import Chip from "@mui/material/Chip";
import { Divider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import moment from "moment";
import Button from "@mui/material/Button";

const Split = ({name,category,amount,id,date}) => {
    const formattedDate = moment(date).format("MMM D, YYYY");
  return (
    <>
      <div className="transaction px-3" style={{ minHeight: "60px" }}>
        <div className="transactionFirst">
          <p className="text-secondary m-0 text-monospace">{formattedDate}</p>
          <p className="px-2">{name}</p>

          <Chip label={category} sx={{ mr: 1 }} />
        </div>
        <div className="transactionSecond d-flex">
          <div className="d-flex align-items-center mx-2">
            <Typography color="secondary">{amount} USD</Typography>
          </div>
          <Button variant="outlined"  href={`splits/${id}/`}>View</Button>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Split;
