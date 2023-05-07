import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import '../recipedetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const MAX_RENDER = 5;
const copy = require('clipboard-copy');

export default function DrinkDetail() {
  const { id } = useParams();
  const history = useHistory();
  const renderRecipes = history.location.pathname.includes('meals');
  const [dataAPI, setDataAPI] = useState([]);
  const [dataInverseAPI, setInverseDataAPI] = useState([]);
  const [copyClip, setCopy] = useState(false);
  const [buttonTap, setButtonTap] = useState(false);
  const [continueButton, setContinueButton] = useState(false);
  const copyButton = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopy(true);
    console.log(copyClip);
  };
  useEffect(() => {
    const getRecipesID = async () => {
      const content = renderRecipes ? 'mealdb' : 'cocktaildb';
      const request = await fetch(`https://www.the${content}.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await request.json();
      const recipe = renderRecipes ? result.meals[0] : result.drinks[0];
      const salvo = localStorage.getItem('favoriteRecipes');
      const inProgress = localStorage.getItem('inProgressRecipes');
      if (salvo === null) {
        setButtonTap(false);
      } else {
        setButtonTap(true);
      }
      // if (dataAPI.idDrink)
      // if (salvo === null) {
      //   setButtonTap(false);
      // } else {
      //   setButtonTap(true);
      // }
      if (inProgress === null) {
        setContinueButton(false);
      } else {
        setContinueButton(true);
      }
      setDataAPI(recipe);
    };
    const getRecommendationsID = async () => {
      const content = renderRecipes ? 'cocktaildb' : 'mealdb';
      const request = await fetch(`https://www.the${content}.com/api/json/v1/1/search.php?s=`);
      const result = await request.json();
      const recipe = renderRecipes ? result.drinks : result.meals;
      setInverseDataAPI(recipe);
    };
    getRecipesID();
    getRecommendationsID();
  }, [id, renderRecipes, setInverseDataAPI]);

  const inProgress = () => {
    const inProgressLocal = {
      drinks: { 15997: [dataAPI.strIngredient1] },
      meals: { 52977: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressLocal));
  };
  const favoriteButton = () => {
    const atual = {
      id: dataAPI.idDrink,
      type: 'drink',
      nationality: '',
      category: dataAPI.strCategory,
      alcoholicOrNot: dataAPI.strAlcoholic,
      name: dataAPI.strDrink,
      image: dataAPI.strDrinkThumb,
    };
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let locais = [];
    if (local !== null) {
      locais = [...local, atual];
    } else {
      locais = [atual];
    }
    console.log(locais);
    localStorage.setItem('favoriteRecipes', JSON.stringify(locais));
    if (buttonTap === false) {
      setButtonTap(true);
    } else {
      setButtonTap(false);
      localStorage.clear();
    }
  };
  return (
    <div className="div-detail">
      <h1 data-testid="recipe-title" className="title-detail">{dataAPI.strDrink}</h1>
      <div className="image-detail">
        <img
          src={ `${dataAPI.strDrinkThumb}` }
          alt={ `${dataAPI.strDrink}` }
          data-testid="recipe-photo"
          className="favoriteIMG"
        />
      </div>
      <h2 data-testid="recipe-category" className="category-detail">
        {dataAPI.strCategory}
        {dataAPI.strAlcoholic}
      </h2>
      <p data-testid="instructions" className="food-detail">{dataAPI.strInstructions}</p>

      <ul>
        {Object.entries(dataAPI)
          .filter(([key, value]) => key.includes('Ingredient') && value)
          .map(([key, value], index) => (
            <li key={ key } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${value}`}
              {dataAPI[`strMeasure${key.slice(-1)}`] && ` - ${dataAPI[`strMeasure${key.slice(-1)}`]}`}
            </li>
          ))}
      </ul>
      <div className="divScroll">
        {dataInverseAPI.map((meal, i) => {
          const handleClick = () => {
            if (renderRecipes) {
              history.push(`/drinks/${meal.idMeal}`);
            } else {
              history.push(`/meals/${meal.idMeal}`);
            }
          };

          if (i <= MAX_RENDER) {
            return (
              <section key={ meal.idMeal } data-testid={ `${i}-recommendation-card` }>
                <div onClick={ handleClick } role="presentation">
                  <img
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                    data-testid={ `${i}-card-img` }
                    className="imageScroll"
                  />
                  <h2 data-testid={ `${i}-recommendation-title` }>{meal.strMeal}</h2>
                </div>
              </section>
            );
          }
          return (null);
        })}
      </div>
      {continueButton === false ? (
        <Link to={ `/drinks/${dataAPI.idDrink}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start"
            onClick={ inProgress }
          >
            Start Recipe
          </button>
        </Link>)
        : (
          <Link to={ `/drinks/${dataAPI.idDrink}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start"
              onClick={ inProgress }
            >
              Continue Recipe
            </button>
          </Link>)}
      <button
        type="button"
        onClick={ copyButton }
        data-testid="share-btn"
        className="copy1"

      >
        <img src={ shareIcon } alt="icone de share" />
      </button>

      <div>
        {copyClip
         && (
           <p>Link copied!</p>
         )}
      </div>
      {buttonTap ? (

        <button
          type="button"
          onClick={ favoriteButton }
          className="copy"

        >
          <img
            src={ blackHeartIcon }
            data-testid="favorite-btn"
            alt="icone de heart"
          />
        </button>
      ) : (
        <button
          type="button"
          className="copy"
          onClick={ favoriteButton }
        >
          <img
            src={ whiteHeartIcon }
            data-testid="favorite-btn"
            alt="icone de heart"
          />
        </button>
      )}

      <Footer />
    </div>
  );
}
