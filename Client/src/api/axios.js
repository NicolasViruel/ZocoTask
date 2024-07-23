//configuramos axios y su domino base
import axios from "axios";
const url = import.meta.env.VITE_BACKEND;
console.log(url);

const instance = axios.create({
  baseURL: url,
  withCredentials: true, //para que establezca las cookies ahi
});

export default instance;
