import axios from "axios"



const authInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
});



export default authInstance;