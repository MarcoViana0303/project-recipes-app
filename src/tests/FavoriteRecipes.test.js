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
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: () => storage,
      },
    });
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
  //   it('test buttons works', () => {
  //     Object.defineProperty(global, 'localStorage', {
  //       value: {
  //         getItem: () => storage,
  //       },
  //     });
  //     renderWithRouter(<FavoriteRecipes />);
  //     const allBtn = screen.getByTestId('filter-by-all-btn');
  //     const mealBtn = screen.getByTestId('filter-by-meal-btn');
  //     const drinkBtn = screen.getByTestId('filter-by-drink-btn');

  //     const image = screen.getByTestId('0-horizontal-image');
  //     // const image1 = screen.getByTestId('1-horizontal-image');

  //     userEvent.click(allBtn);
  //     expect(image).toBeInTheDocument();

  //     userEvent.click(mealBtn);
  //     const imageMeal = screen.getByAltText('Foto de Spicy Arrabiata Penne');
  //     expect(imageMeal).toBeInTheDocument();

  //     userEvent.click(drinkBtn);
  //     expect(image).toBeInTheDocument();
  //   });
  it('test buttons works', () => {
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: () => storage,
      },
    });
    renderWithRouter(<FavoriteRecipes />);

    const favoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');

    userEvent.click(favoriteBtn);
    const image = screen.getByTestId('1-horizontal-image');
    expect(image).toBeInTheDocument();
  });
});
