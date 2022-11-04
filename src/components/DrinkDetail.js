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
    <div>
      <h1 data-testid="recipe-title">{dataAPI.strDrink}</h1>
      <img
        src={ `${dataAPI.strDrinkThumb}` }
        alt={ `${dataAPI.strDrink}` }
        data-testid="recipe-photo"
        className="favoriteIMG"
      />
      <h2 data-testid="recipe-category">
        {dataAPI.strCategory}
        {dataAPI.strAlcoholic}
      </h2>
      <p data-testid="instructions">{dataAPI.strInstructions}</p>

      <ul>
        <li data-testid="0-ingredient-name-and-measure">{dataAPI.strIngredient1}</li>
        <li data-testid="0-ingredient-name-and-measure">{dataAPI.strMeasure1}</li>
        <li data-testid="1-ingredient-name-and-measure">{dataAPI.strIngredient2}</li>
        <li data-testid="1-ingredient-name-and-measure">{dataAPI.strMeasure2}</li>
        <li data-testid="2-ingredient-name-and-measure">{dataAPI.strIngredient3}</li>
        <li data-testid="2-ingredient-name-and-measure">{dataAPI.strMeasure3}</li>
        <li data-testid="3-ingredient-name-and-measure">{dataAPI.strIngredient4}</li>
        <li data-testid="3-ingredient-name-and-measure">{dataAPI.strMeasure4}</li>
        <li data-testid="4-ingredient-name-and-measure">{dataAPI.strIngredient5}</li>
        <li data-testid="4-ingredient-name-and-measure">{dataAPI.strMeasure5}</li>
        <li data-testid="5-ingredient-name-and-measure">{dataAPI.strIngredient6}</li>
        <li data-testid="5-ingredient-name-and-measure">{dataAPI.strMeasure6}</li>
        <li data-testid="6-ingredient-name-and-measure">{dataAPI.strIngredient7}</li>
        <li data-testid="6-ingredient-name-and-measure">{dataAPI.strMeasure7}</li>
        <li data-testid="7-ingredient-name-and-measure">{dataAPI.strIngredient8}</li>
        <li data-testid="7-ingredient-name-and-measure">{dataAPI.strMeasure8}</li>
        <li data-testid="8-ingredient-name-and-measure">{dataAPI.strIngredient9}</li>
        <li data-testid="8-ingredient-name-and-measure">{dataAPI.strMeasure9}</li>
        <li data-testid="9-ingredient-name-and-measure">{dataAPI.strIngredient10}</li>
        <li data-testid="9-ingredient-name-and-measure">{dataAPI.strMeasure10}</li>
        <li data-testid="10-ingredient-name-and-measure">{dataAPI.strIngredient11}</li>
        <li data-testid="10-ingredient-name-and-measure">{dataAPI.strMeasure11}</li>
        <li data-testid="11-ingredient-name-and-measure">{dataAPI.strIngredient12}</li>
        <li data-testid="11-ingredient-name-and-measure">{dataAPI.strMeasure12}</li>
        <li data-testid="12-ingredient-name-and-measure">{dataAPI.strIngredient13}</li>
        <li data-testid="12-ingredient-name-and-measure">{dataAPI.strMeasure13}</li>
        <li data-testid="13-ingredient-name-and-measure">{dataAPI.strIngredient14}</li>
        <li data-testid="13-ingredient-name-and-measure">{dataAPI.strMeasure14}</li>
        <li data-testid="14-ingredient-name-and-measure">{dataAPI.strIngredient15}</li>
        <li data-testid="14-ingredient-name-and-measure">{dataAPI.strMeasure15}</li>
        <li data-testid="15-ingredient-name-and-measure">{dataAPI.strIngredient16}</li>
        <li data-testid="15-ingredient-name-and-measure">{dataAPI.strMeasure16}</li>
        <li data-testid="16-ingredient-name-and-measure">{dataAPI.strIngredient17}</li>
        <li data-testid="16-ingredient-name-and-measure">{dataAPI.strMeasure17}</li>
        <li data-testid="17-ingredient-name-and-measure">{dataAPI.strIngredient18}</li>
        <li data-testid="17-ingredient-name-and-measure">{dataAPI.strMeasure18}</li>
        <li data-testid="18-ingredient-name-and-measure">{dataAPI.strIngredient19}</li>
        <li data-testid="18-ingredient-name-and-measure">{dataAPI.strMeasure19}</li>
        <li data-testid="19-ingredient-name-and-measure">{dataAPI.strIngredient20}</li>
        <li data-testid="19-ingredient-name-and-measure">{dataAPI.strMeasure20}</li>
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
