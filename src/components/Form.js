import React, { useContext, useState } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import { RecipesContext } from '../context/RecipesContext';

const Form = () => {

    const { categories } = useContext(CategoryContext);
    const { setSearch, setConsult } = useContext(RecipesContext);
    const [ingredient_categoy, setIngredient_categoy] = useState({
        ingredient: '',
        category: ''
    });
    const [ error, setError ] = useState(false);

    const handleChange = e => {
        setIngredient_categoy({
            ...ingredient_categoy,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(ingredient_categoy.ingredient.trim() === '' || ingredient_categoy.category.trim() === '') {
            setError(true);
            return;
        }

        setError(false);
        setSearch(ingredient_categoy);
        setConsult(true);
    }

    return ( 
        <form
            className="col-12"
            onSubmit={handleSubmit}
        >
            { error ? <p className="alert alert-danger text-center p-2">All fields are required</p> : null }
            <fieldset className="text-center">
                <legend>Search drinks by category or ingredient</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                    name="ingredient"
                    className="form-control"
                    type="text"
                    placeholder="Search by ingredient"
                    onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="category"
                        onChange={handleChange}
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map(category => (
                            <option 
                            key={category.strCategory} 
                            value={category.strCategory}
                            onChange={handleChange}
                            >{category.strCategory}</option>
                        ))}    
                    </select>
                </div>

                <div className="col-md-4">
                    <input
                        className="btn btn-block btn-primary"
                        type="submit"
                        value="Search Recipes"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Form;