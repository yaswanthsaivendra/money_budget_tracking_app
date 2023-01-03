import axios from "axios";
import Cookies from "js-cookie"
// let url = process.env.REACT_APP_BACKEND_URL;
// let url = "http://localhost:8000/";

let url = "https://tnpbe.herokuapp.com/";
// let url = "http://localhost:8000"
// let token = Cookies.get('token');
// console.log(token)
// let headersObj = {};
// if (token && token.length > 5) headersObj = { token };

const client = axios.create({
  baseURL: url,
  withCredentials:true
});

export default client;
