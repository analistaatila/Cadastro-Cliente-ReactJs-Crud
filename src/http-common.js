import axios from "axios";

export default axios.create({
  baseURL: "https://60bf9ca997295a0017c435be.mockapi.io/",
  headers: {
    "Content-type": "application/json"
  }
});