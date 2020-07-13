import React, { useContext, useState } from 'react';
import { PopUpContext } from '../context/PopUpContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Recipe = ({ recipe }) => {

    //Config modal from material-ui

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    //Context values
    const { setIdRecipes, fullRecipe, setFullRecipe } = useContext(PopUpContext);

    //Showing Ingredients
    const showIngredients = fullRecipe => {
        let ingredients = [];
        for (let i = 1; i < 16; i++) {
            if (fullRecipe[`strIngredient${i}`]) {
                ingredients.push(
                    <li>{fullRecipe[`strIngredient${i}`] }
                   { fullRecipe[`strMeasure${i}`]}</li>
                )
            }
        }

        return ingredients;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{recipe.strDrink}</h2>

                <img className="card-img-top" src={recipe.strDrinkThumb} alt={recipe.strDrink} />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdRecipes(recipe.idDrink);
                            handleOpen();
                        }}
                    > See Recipe</button>

                    <Modal
                        open={open}
                        onClose={() => {
                            setIdRecipes(null);
                            handleClose();
                            setFullRecipe({});
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{fullRecipe.strDrink}</h2>
                            <h3 className="mt-4">Instructions</h3>
                            <p>
                                {fullRecipe.strInstructions}
                            </p>

                            <img className="img-fluid my-4" src={fullRecipe.strDrinkThumb} alt={recipe.strDrink} />
                            <h3>Ingredients and Quantities</h3>
                            <ul>
                                {showIngredients(fullRecipe)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Recipe;