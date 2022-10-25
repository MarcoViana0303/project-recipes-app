import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import Login from '../pages/Login';

const EMAIL_SAMPLE = 'nome@exemple.com';
const PASSWORD_SAMPLE = '1234567';

const INPUT_EMAIL = 'email-input';
const INPUT_PASSWORD = 'password-input';
const INPUT_BUTTON = 'login-submit-btn';

describe('01 - The following inputs must be on the screen:', () => {
  test('Email input', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL);

    expect(emailInput).toBeInTheDocument();
  });

  test('Password input', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD);

    expect(passwordInput).toBeInTheDocument();
  });

  test('Button input', () => {
    renderWithRouter(<App />);
    const buttonInput = screen.getByTestId(INPUT_BUTTON);

    expect(buttonInput).toBeInTheDocument();
  });
});

describe('02 - Check page pathname', () => {
  it('Pathname must be "/carteira", after click in login button', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD);
    const buttonInput = screen.getByTestId(INPUT_BUTTON);

    userEvent.type(emailInput, EMAIL_SAMPLE);
    userEvent.type(passwordInput, PASSWORD_SAMPLE);
    userEvent.click(buttonInput);

    expect(history.location.pathname).toBe('/meals');
  });
});
