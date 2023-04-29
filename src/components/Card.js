import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import AppContext from '../context/AppContext';

export default function Card({ thumb, str, index, idMeal }) {
  const history = useHistory();
  // const { setgetIdFromRecipe } = useContext(AppContext);

  const handleClick = () => {
    const newPath = history.location.pathname.concat(`/${idMeal}`);
    history.push(newPath);
    // setgetIdFromRecipe(idMeal);
  };

  return (
    <div onClick={ handleClick } role="presentation" className='div-card-recipes'>
      <img
        src={ thumb }
        className="favoriteIMG"
        alt={ str }
        data-testid={ `${index}-card-img` }
      />
      
      <h2 data-testid={ `${index}-card-name` }>{str}</h2>
    </div>
  );
}

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  idMeal: PropTypes.number.isRequired,
};
