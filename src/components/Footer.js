import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';
import '../recipedetails.css';

class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer data-testid="footer">
          <Link to="/drinks">
            <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
          </Link>
          <Link to="/meals">
            <img src={ mealIcon } alt="mealIcon" data-testid="meals-bottom-btn" />
          </Link>
        </footer>
      </div>
    );
  }
}

export default Footer;
