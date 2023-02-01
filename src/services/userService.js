import { stringify } from "react-auth-wrapper/helpers";
import axios from "../axios";

const handleLoginApi = (email, password) => {
  let data = JSON.stringify({
    username: email,
    password: password,
  });
  return axios.post("/api/login", data, {
    headers: { "Content-Type": "application/json" },
  });
};
const getAllUsers = (inputID) => {
  return axios.post("/api/get-all-users", { id: inputID });
};
export { handleLoginApi, getAllUsers };
