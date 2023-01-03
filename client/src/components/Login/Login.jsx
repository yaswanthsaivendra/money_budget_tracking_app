import React from "react";
import Header from "../Header/Header";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../../axios";
import Cookies from "js-cookie";
const Login = () => {
  const [option, setOption] = useState("login");
  const [loginFormDetails, setLoginFormDetails] = useState({
    username: "",
    password: "",
  });
  const [registerFormDetails, setRegisterFormDetails] = useState({
    username: "",
    email:"",
    password: "",
    cpassword: "",
  });
  const loginHandleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setLoginFormDetails({ ...loginFormDetails, [name]: newValue });
  };
  const registerHandleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setRegisterFormDetails({ ...registerFormDetails, [name]: newValue });
  };
  const loginSubmit = async (evt) => {
    evt.preventDefault();

    let data = { loginFormDetails };
    const res = await axios.post("/login", data);
    //set cookie
    const { token } = data;
    //setting up cookies
    Cookies.set("token", token, { expires: 1, path: "/" });

    localStorage.setItem("token", token);
    
  };
  const registerSubmit = async (evt) => {
    evt.preventDefault();

    let data = { registerFormDetails };
    const res = await axios.post("/auth/signup")
    console.log(res)
    // fetch("https://pointy-gauge.glitch.me/api/form", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((response) => console.log("Success:", JSON.stringify(response)))
    //   .catch((error) => console.error("Error:", error));
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header title="Splitters" setOption={setOption} />
      <br /> <br />
      <br />
      {option === "login" ? (
        <>
          <div
            className="container m-auto mt-5 border rounded"
            style={{ maxWidth: "500px", minHeight: "400px" }}>
            <h2 className="p-4 text-center">Login</h2>
            <div className="p-2 pt-0 ">
              <form onSubmit={loginSubmit}>
                <TextField
                  style={{ margin: "10px 5px" }}
                  fullWidth
                  type="text"
                  label="username"
                  variant="outlined"
                  name="username"
                  defaultValue={loginFormDetails.username}
                  onChange={loginHandleInput}
                />
               

                <TextField
                  style={{ margin: "10px 5px" }}
                  fullWidth
                  type="password"
                  label="password"
                  variant="outlined"
                  name="password"
                  defaultValue={loginFormDetails.password}
                  onChange={loginHandleInput}
                />
                <br />
                <br />
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large">
                    Login
                  </Button>
                </div>
                <p className="p-3">
                  Do not have an account?{" "}
                  <Button
                    onClick={() => {
                      setOption("register");
                    }}>
                    register
                  </Button>{" "}
                </p>
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {option === "register" ? (
        <>
          <div
            className="container m-auto mt-5 border rounded"
            style={{ maxWidth: "500px", minHeight: "400px" }}>
            <h2 className="p-4 text-center">Register</h2>
            <div className="p-2 pt-0 ">
              <form onSubmit={registerSubmit}>
                <TextField
                  style={{ margin: "10px 5px" }}
                  fullWidth
                  type="text"
                  label="username"
                  variant="outlined"
                  name="username"
                  defaultValue={registerFormDetails.username}
                  onChange={registerHandleInput}
                />
                 <TextField
                  style={{ margin: "10px 5px" }}
                  fullWidth
                  type="text"
                  label="email"
                  variant="outlined"
                  name="email"
                  defaultValue={registerFormDetails.email}
                  onChange={registerHandleInput}
                />

                <TextField
                  style={{ margin: "10px 5px" }}
                  fullWidth
                  type="password"
                  label="password"
                  variant="outlined"
                  name="password"
                  defaultValue={registerFormDetails.password}
                  onChange={registerHandleInput}
                />
                <TextField
                  style={{ margin: "10px 5px" }}
                  fullWidth
                  type="password"
                  label="confirm password"
                  variant="outlined"
                  name="cpassword"
                  defaultValue={registerFormDetails.cpassword}
                  onChange={registerHandleInput}
                />
                <br />
                <br />
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large">
                    Register
                  </Button>
                </div>
                <p className="p-3">
                  already have an account?
                  <Button
                    onClick={() => {
                      setOption("login");
                    }}>
                    Login
                  </Button>
                </p>
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
