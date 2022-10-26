import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Header', () => {
  test('verifica se na rota /drinks, o header é renderizado', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const titulo = screen.getByRole('heading', {
      name: /drinks/i,
    });

    const searchButton = screen.getByRole('button', {
      name: /search/i,
    });

    const linkProfile = screen.getByRole('link', {
      name: /profile/i,
    });

    userEvent.click(searchButton);
    const inputSearch = screen.getByRole('textbox');

    expect(inputSearch).toBeInTheDocument();
    expect(titulo).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(linkProfile).toBeInTheDocument();
  });

  test('verifica se na rota /profile, o header é renderizado sem a lupa de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    const titulo = screen.getByRole('heading', {
      name: /profile/i,
    });

    const linkProfile = screen.getByRole('link', {
      name: /profile/i,
    });
    expect(titulo).toBeInTheDocument();
    expect(linkProfile).toBeInTheDocument();
  });

  test('verifica se na rota /done-recipes, o header é renderizado sem a lupa de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    const titulo = screen.getByRole('heading', {
      name: /done recipes/i,
    });

    const linkProfile = screen.getByRole('link', {
      name: /profile/i,
    });
    expect(titulo).toBeInTheDocument();
    expect(linkProfile).toBeInTheDocument();
  });

  test('verifica se na rota /favorite-recipes, o header é renderizado sem a lupa de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const titulo = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });

    const linkProfile = screen.getByRole('link', {
      name: /profile/i,
    });
    expect(titulo).toBeInTheDocument();
    expect(linkProfile).toBeInTheDocument();
  });
});
