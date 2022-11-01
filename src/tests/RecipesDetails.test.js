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

describe('Teste do componente RecipesDetails', () => {
  it('teste tela meals id', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD);
    const buttonInput = screen.getByTestId(INPUT_BUTTON);

    userEvent.type(emailInput, EMAIL_SAMPLE);
    userEvent.type(passwordInput, PASSWORD_SAMPLE);
    userEvent.click(buttonInput);

    const card = await screen.findByTestId('0-card-img');
    userEvent.click(card);

    const foto = await screen.findByTestId('recipe-photo');
    expect(foto).toBeInTheDocument();

    const titulo = await screen.findByTestId('recipe-title');
    expect(titulo).toBeInTheDocument();
  });
  it('teste tela drinks id', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(INPUT_EMAIL);
    const passwordInput = screen.getByTestId(INPUT_PASSWORD);
    const buttonInput = screen.getByTestId(INPUT_BUTTON);

    userEvent.type(emailInput, EMAIL_SAMPLE);
    userEvent.type(passwordInput, PASSWORD_SAMPLE);
    userEvent.click(buttonInput);

    const button = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(button);

    const card = await screen.findByTestId('0-card-img');
    userEvent.click(card);

    const foto = await screen.findByTestId('recipe-photo');
    expect(foto).toBeInTheDocument();

    const titulo = await screen.findByTestId('recipe-title');
    expect(titulo).toBeInTheDocument();
  });
});
