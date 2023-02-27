import axios from "axios"

console.log("axios error");

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
  });
// const instance = true

export default instance;