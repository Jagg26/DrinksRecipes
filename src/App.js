import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import RecipesList from './components/RecipesList';

import CategoryProvider from './context/CategoryContext';
import RecipesProvider from './context/RecipesContext';
import PopUpProvider from './context/PopUpContext';

function App() {
  return (
    <CategoryProvider>
      <RecipesProvider>
        <PopUpProvider>
        <Header />

        <div className="container mt-5">
          <div className="row">
            <Form />
          </div>

          <RecipesList />
        </div>
        </PopUpProvider>
      </RecipesProvider>
    </CategoryProvider>
  );
}

export default App;
