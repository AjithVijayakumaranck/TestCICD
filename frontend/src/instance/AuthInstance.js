import axios from "axios"

const authInstance = axios.create();

authInstance.interceptors.request.use(

    (config) => {
      
        config.baseURL = process.env.REACT_APP_BACKEND_URL;
        config.headers = Object.assign(
            {
                Authorization: 'Bearer ' + `${localStorage.getItem("token")}`,
            },
            config.headers
        );
       
        return config;
    }
)



export default authInstance;