import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PopUpContext = createContext();

const PopUpProvider = (props) => {

    //State
    const [ idRecipe, setIdRecipes ] = useState(null);
    const [ fullRecipe, setFullRecipe ] = useState({});

    //API call 
    useEffect(() => {
        const getRecipe = async () => {
            if(!idRecipe) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;

            const result = await axios.get(url);
            setFullRecipe(result.data.drinks[0]);
        }
        getRecipe();
    }, [idRecipe])

    return ( 
        <PopUpContext.Provider
            value={{
                fullRecipe,
                setIdRecipes,
                setFullRecipe
            }}
        >
            {props.children}
        </PopUpContext.Provider>
     );
}
 
export default PopUpProvider;