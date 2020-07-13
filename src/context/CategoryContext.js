import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
export const CategoryContext = createContext();

// Provider

const CategoryProvider = (props) => {
    
    //Create Context State
    const [categories, setCategories] = useState([]);

    //API call
    useEffect(() => {
        const getCategories = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categories = await axios.get(url)

            setCategories(categories.data.drinks);
        }
        getCategories();

    }, []);

    return (
        <CategoryContext.Provider
            value={{
                categories
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    )
}
export default CategoryProvider;