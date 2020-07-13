import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipesContext = createContext();

const RecipesProvider = (props) => {

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState({
        ingredient: '',
        category: ''
    });
    const [ consult, setConsult] = useState(false);

    const { ingredient, category } = search;

    useEffect(() => {

        if(consult) {
            const getRecipes = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;

                const result = await axios.get(url);

                setRecipes(result.data.drinks);
            }
            getRecipes();
        }  
        
    // eslint-disable-next-line
    }, [search]);

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                setSearch, 
                setConsult
            }}
        >
            {props.children}
        </RecipesContext.Provider>
    );
}

export default RecipesProvider;