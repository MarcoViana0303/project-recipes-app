import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const storage = JSON.stringify([
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
]);

describe('Teste do componente Profile', () => {
  it('test render card', () => {
    localStorage.setItem('favoriteRecipes', storage);
    renderWithRouter(<FavoriteRecipes />);
    const image = screen.getByTestId('0-horizontal-image');
    const name = screen.getByTestId('0-horizontal-name');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });
  it('test buttons works', () => {
    localStorage.setItem('favoriteRecipes', storage);
    renderWithRouter(<FavoriteRecipes />);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(allBtn);
    const image = screen.getByTestId('0-horizontal-image');
    expect(image).toBeInTheDocument();

    userEvent.click(mealBtn);
    const imageMeal = screen.queryByAltText('Foto de Spicy Arrabiata Penne');
    const imageDrink = screen.queryByAltText('Aquamarine');
    expect(imageMeal).toBeInTheDocument();
    expect(imageDrink).not.toBeInTheDocument();

    userEvent.click(drinkBtn);
    const imageMeal1 = screen.queryByAltText('Foto de Spicy Arrabiata Penne');
    const imageDrink1 = screen.queryByAltText('Aquamarine');
    expect(imageMeal1).not.toBeInTheDocument();
    expect(imageDrink1).toBeInTheDocument();
  });
  it('test button unfavorite works', () => {
    localStorage.setItem('favoriteRecipes', storage);
    renderWithRouter(<FavoriteRecipes />);

    const favoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');

    userEvent.click(favoriteBtn);
    const image = screen.queryByTestId('1-horizontal-image');
    expect(image).not.toBeInTheDocument();
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(local).toHaveLength(1);
  });
  it('test button share works', () => {
    localStorage.setItem('favoriteRecipes', storage);
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    renderWithRouter(<FavoriteRecipes />);

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(shareBtn);
    const link = screen.getByText(/link copied!/i);
    expect(link).toBeInTheDocument();
  });
});
