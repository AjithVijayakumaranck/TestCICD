import axios from "axios"




const adminInstance = axios.create();

adminInstance.interceptors.request.use(

    (config) => {
       
        config.baseURL = process.env.REACT_APP_BACKEND_URL;
        config.headers = Object.assign(
            {
                Authorization: 'Bearer ' + `${localStorage.getItem("AdminToken")}`,
            },
            config.headers
        );
       
        return config;
    }
)



export default adminInstance;