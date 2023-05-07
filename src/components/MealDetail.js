import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import '../recipedetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import YouTube from 'react-youtube';

const MAX_RENDER = 5;
const copy = require('clipboard-copy');

export default function MealDetail() {
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
      const recipe = renderRecipes ? result?.meals[0] : result?.drinks[0];
      const salvo = localStorage.getItem('favoriteRecipes');
      const inProgress = localStorage.getItem('inProgressRecipes');
      if (salvo === null) {
        setButtonTap(false);
      } else {
        setButtonTap(true);
      }

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
      const recipe = renderRecipes ? result?.drinks : result?.meals;
      setInverseDataAPI(recipe);
    };
    getRecipesID();
    getRecommendationsID();
  }, [id, renderRecipes, setInverseDataAPI]);

  const inProgress = () => {
    const inProgressLocal = {
      drinks: { 15997: [] },
      meals: { 52977: [dataAPI.strIngredient1] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressLocal));
  };

  const favoriteButton = () => {
    const atual = {
      id: dataAPI.idMeal,
      type: 'meal',
      nationality: dataAPI.strArea,
      category: dataAPI.strCategory,
      alcoholicOrNot: '',
      name: dataAPI.strMeal,
      image: dataAPI.strMealThumb,
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
      <h1 data-testid="recipe-title" className="title-detail">{dataAPI?.strMeal}</h1>
      <div className="image-detail">
        <img
          src={ `${dataAPI?.strMealThumb}` }
          alt={ `${dataAPI?.strMeal}` }
          data-testid="recipe-photo"
          className="favoriteIMG"
        />
      </div>
      <h2 data-testid="recipe-category" className="category-detail">{dataAPI?.strCategory}</h2>
      <p data-testid="instructions" className="food-detail">{dataAPI?.strInstructions}</p>
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

      <YouTube
        title={ `${dataAPI?.strMeal}` }
        videoId={ `${dataAPI?.strYoutube}` }
      />

      <div className="divScroll">
        {dataInverseAPI?.map((drink, i) => {
          const handleClick = () => {
            if (renderRecipes) {
              history.push(`/drinks/${drink?.idDrink}`);
            } else {
              history.push(`/meals/${drink?.idDrink}`);
            }
          };
          if (i <= MAX_RENDER) {
            return (
              <section key={ drink.idDrink } data-testid={ `${i}-recommendation-card` }>
                <div onClick={ handleClick } role="presentation">
                  <img
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                    data-testid={ `${i}-card-img` }
                    className="imageScroll"
                  />
                  <h2 data-testid={ `${i}-recommendation-title` }>{drink.strDrink}</h2>
                </div>
              </section>
            );
          }
          return (null);
        })}
        {continueButton === false ? (
          <Link to={ `/meals/${dataAPI?.idMeal}/in-progress` }>
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
            <Link to={ `/meals/${dataAPI?.idMeal}/in-progress` }>
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
            onClick={ favoriteButton }
            className="copy"
          >
            <img
              src={ whiteHeartIcon }
              data-testid="favorite-btn"
              alt="icone de heart"
            />
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
