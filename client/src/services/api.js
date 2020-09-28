import axios from "axios";
import jwt_decode from "jwt-decode";
import { json } from "body-parser";
import { removeError, addError } from "../store/actions";
import { store } from "../store";


export const candidateData = async () => {
  const response = await axios.get("http://localhost:5000/voting/candidates");
  const data = {
    data:response.data
  };
  return data;
};
export const voterData = async () => {
  const response = await axios.get("http://localhost:5000/voting/voters");
  console.log("daata ", response.data);
  const data = {
    data:response.data
  };
  return data;
};
export const login = (user) => {
  return axios
    .post("http://localhost:5000/voting/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      // console.log("response is ", response.data);
      localStorage.setItem("loginToken", response.data);
      // const token = localStorage.usertoken;
      // const decoded = jwt_decode(token);
      // const data = {
      //   first_name: decoded.first_name,
      //   last_name: decoded.last_name,
      //   email: decoded.email,
      // };
      return response.data;
      // return response.data
    })
    .catch((err) => {
      console.log("error is ", err);
    });
};


export default { candidateData, voterData , login};
