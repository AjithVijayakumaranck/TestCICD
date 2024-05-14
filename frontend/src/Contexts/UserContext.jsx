import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
    const [User, SetUser] = useState({})



    useEffect(() => {
        const decodeToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwt_decode(token);
                SetUser(decodedToken._doc);
               
            }

        };

        // Call the decodeToken function when the component mounts
        decodeToken();
    }, [])
     console.log(User, "usercontext data");
    return (
        <UserContext.Provider value={{ User, SetUser }}>
            {children}
        </UserContext.Provider>
    )
}