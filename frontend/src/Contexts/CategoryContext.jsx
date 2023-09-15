import React, { createContext, useEffect, useState } from "react";
import instance from "../instance/AxiosInstance";

export const CategoryContext = createContext();
export const CategoryProviderProvider = ({ children }) => {
    const [Categories, SetCategories] = useState([])

    useEffect(() => {
        instance.get('/api/category/get_categories').then((response) => {
            SetCategories([...response.data]);
        })
    }, [])


    return (
        <CategoryContext.Provider value={{ Categories, SetCategories }}>
            {children}
        </CategoryContext.Provider>
    )
}   