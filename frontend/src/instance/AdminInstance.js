import axios from "axios"

const adminInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('AdminToken') }
});


export default adminInstance;