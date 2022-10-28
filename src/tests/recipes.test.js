import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const EMAIL_SAMPLE = 'nome@exemple.com';
const PASSWORD_SAMPLE = '1234567';

const INPUT_EMAIL = 'email-input';
const INPUT_PASSWORD = 'password-input';
const INPUT_BUTTON = 'login-submit-btn';

describe('Teste do componente Recipes', () => {
  it('teste botao drinks', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD);
    const buttonInput = screen.getByTestId(INPUT_BUTTON);

    userEvent.type(emailInput, EMAIL_SAMPLE);
    userEvent.type(passwordInput, PASSWORD_SAMPLE);
    userEvent.click(buttonInput);
    const buttonBeef = await screen.findByTestId('Beef-category-filter');
    expect(buttonBeef).toBeInTheDocument();

    userEvent.click(buttonBeef);

    const card = await screen.findByTestId('0-card-img');
    expect(card).toBeInTheDocument();

    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(buttonDrinks);

    const buttonShake = await screen.findByTestId('Shake-category-filter');
    expect(buttonShake).toBeInTheDocument();
    userEvent.click(buttonShake);
    const card1 = await screen.findByTestId('1-card-img');
    expect(card1).toBeInTheDocument();
  });
});
