import React, { useState } from "react";
import { Button, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../axios";
import moment from "moment";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";

const Content = ({ splits, setAlert, user, users, budget,setBudget }) => {
  const [split, setSplit] = useState({});
  const [transactions, setTransactions] = useState([]);
  let { id } = useParams();
  let formattedDate = "";
  useEffect(() => {
    const getSplit = () => {
      splits.forEach((split) => {
        if (split.id == id) {
          users.forEach((user) => {
            if (user.id === split.payer) {
              split.payer = user.username;
            }
            if (user.id === split.creator) {
              split.creator = user.username;
            }
            split.splitters.forEach((id, index) => {
              if (user.id === split.splitters[index]) {
                split.splitters[index] = user.username;
              }
            });
          });
          setSplit(split);
        }
      });
      // try {
      //   const res = await axios.get(`/splitter/splitroom/${id}`, {
      //     headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      //   });
      //   console.log(res);

      //   users.forEach((user) => {
      //     if (user.id === res.data.payer) {
      //       res.data.payer = user.username;
      //     }
      //     if (user.id === res.data.creator) {
      //       res.data.creator = user.username;
      //     }
      //     res.data.splitters.forEach((id, index) => {
      //       if (user.id === res.data.splitters[index]) {
      //         res.data.splitters[index] = user.username;
      //       }
      //     });
      //   });
      //   setSplit(res.data);
      // } catch (err) {
      //   console.log(err);
      // }
    };
    const getSplitTransactions = async () => {
      try {
        const res = await axios.get(`/splitter/splitroom-transactions/${id}`, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
        console.log(res);
        setTransactions(res.data);
        users.forEach((user) => {
          if (user.id === res.data.receiver) {
            res.data.receiver = user.username;
          }
          if (user.id === res.data.sender) {
            res.data.sender = user.username;
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    getSplit();
    getSplitTransactions();
  }, []);
  formattedDate = moment(split.date).format("MMMM D, YYYY");

  return (
    <>
      <div class="container">
        <div
          className="friendsContainer border rounded  py-5 m-auto text-start"
          style={{ maxWidth: "1100px", minHeight: "600px" }}>
          <div className="d-flex justify-content-between pb-3 px-4">
            <h5 className="m-2 text-capitalize">{split.name}</h5>
            <div className=""><a href="/splits/"><Button variant="contained">Go back</Button></a></div>
          </div>
          <div className="p-4">
            <table id="splitDetails">
              <tbody>
                <tr>
                  <td className="p-2">Amount</td>
                  <td className="p-2">{split.amount}</td>
                </tr>
                <tr>
                  <td className="p-2">Category</td>
                  <td className="p-2">{split.category}</td>
                </tr>
                <tr>
                  <td className="p-2">Created at</td>
                  <td className="p-2">{formattedDate}</td>
                </tr>
                <tr>
                  <td className="p-2">Created by</td>
                  <td className="p-2">{split.creator}</td>
                </tr>
                <tr>
                  <td className="p-2">Paid by</td>
                  <td className="p-2">{split.payer}</td>
                </tr>
                <tr>
                  <td className="p-2">Description</td>
                  <td className="p-2">{split.description} </td>
                </tr>
                <tr>
                  <td className="p-2">Splitters</td>
                  <td className="p-2">
                    {split.splitters?.map((item) => (
                      <span key={item}>{item}, </span>
                    ))}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="transactions border m-4">
            <h5 className="mt-3 px-4">Transactions:</h5>
            <Divider />
            {transactions?.map((transaction) => (
              <Transaction
                amount={transaction.amount}
                category={transaction.category}
                sender={transaction.sender}
                receiver={transaction.receiver}
                date={transaction.created_at}
                users={users}
                id={transaction.id}
                is_paid={transaction.is_paid}
                user={user}
                setAlert={setAlert}
                budget={budget}
                setBudget={setBudget}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
