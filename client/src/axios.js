import axios from "axios";
import Cookies from "js-cookie"
let url = "http://yaswanthsaivendra.pythonanywhere.com/";
// let token = Cookies.get('token');
// console.log(token)
// let headersObj = {};
// if (token && token.length > 5) headersObj = { token };

const client = axios.create({
  baseURL: url,
  // withCredentials:true
});

export default client;
