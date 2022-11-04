import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Teste do componente Profile', () => {
  it('teste email', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });

  it('teste botao Done recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-done-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('teste botao Favorite recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-favorite-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('teste botao Logout', () => {
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByTestId('profile-logout-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('teste localStorage', () => {
    renderWithRouter(<Profile />);
    const local = localStorage.getItem('email');
    expect(local).toBeNull();
  });
});
