import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

// const EMAIL_SAMPLE = 'nome@exemple.com';
// const PASSWORD_SAMPLE = '1234567';

describe('01 - Testando o componente SearchBar da pagina meals', () => {
  test('Verifica a URL esta sendo chamada corretamente para o imput ingredientes', () => {
    const { history } = renderWithRouter(<App />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(['xablau']),
    });

    act(() => {
      history.push('/meals');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const radio = screen.getByTestId('ingredient-search-radio');
    expect(radio).toBeInTheDocument();

    const ingredientes = screen.getByText(/ingrediente/i);
    expect(ingredientes).toBeInTheDocument();

    const name = screen.getByText(/nome/i);
    expect(name).toBeInTheDocument();

    const letter = screen.getByText(/primeira letra/i);
    expect(letter).toBeInTheDocument();

    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId('search-input');
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'Arrabiata');

    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?=Arrabiata');
  });

  test('Verifica a URL esta sendo chamada corretamente para o imput name', () => {
    const { history } = renderWithRouter(<App />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(['xablau']),
    });

    act(() => {
      history.push('/meals');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const radio = screen.getByTestId('ingredient-search-radio');
    expect(radio).toBeInTheDocument();

    const name = screen.getByText(/nome/i);
    expect(name).toBeInTheDocument();
    userEvent.click(name);

    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId('search-input');
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'Arrabiata');

    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
  });

  test('Verifica a URL esta sendo chamada corretamente para o imput primeira letra', () => {
    const { history } = renderWithRouter(<App />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(['xablau']),
    });

    act(() => {
      history.push('/meals');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const radio = screen.getByTestId('ingredient-search-radio');
    expect(radio).toBeInTheDocument();

    const letter = screen.getByText(/primeira letra/i);
    expect(letter).toBeInTheDocument();
    userEvent.click(letter);

    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId('search-input');
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'a');

    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });
});

describe('01 - Testando o componente SearchBar da pagina Drinks', () => {
  test('Verifica a URL esta sendo chamada corretamente para o imput primeira letra da página drink', () => {
    const { history } = renderWithRouter(<App />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(['xablau']),
    });

    act(() => {
      history.push('/drinks');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const radio = screen.getByTestId('ingredient-search-radio');
    expect(radio).toBeInTheDocument();

    const letter = screen.getByText(/primeira letra/i);
    expect(letter).toBeInTheDocument();
    userEvent.click(letter);

    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId('search-input');
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'a');

    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });

  test('Verifica a URL esta sendo chamada corretamente para o imput name da página drink', () => {
    const { history } = renderWithRouter(<App />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(['xablau']),
    });

    act(() => {
      history.push('/drinks');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const radio = screen.getByTestId('ingredient-search-radio');
    expect(radio).toBeInTheDocument();

    const name = screen.getByText(/nome/i);
    expect(name).toBeInTheDocument();
    userEvent.click(name);

    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId('search-input');
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'Arrabiata');

    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Arrabiata');
  });

  test('Verifica a URL esta sendo chamada corretamente para o imput ingredientes', () => {
    const { history } = renderWithRouter(<App />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(['xablau']),
    });

    act(() => {
      history.push('/drinks');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const radio = screen.getByTestId('ingredient-search-radio');
    expect(radio).toBeInTheDocument();

    const ingredientes = screen.getByText(/ingrediente/i);
    expect(ingredientes).toBeInTheDocument();
    userEvent.click(ingredientes);

    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId('search-input');
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'Arrabiata');

    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Arrabiata');
  });

  test('Verifica se o alert com a mensagem "Your search must have only 1 (one) character" aparece na tela', () => {
    const { history } = renderWithRouter(<App />);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(['xablau']),
    });

    act(() => {
      history.push('/drinks');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const letter = screen.getByText(/primeira letra/i);
    expect(letter).toBeInTheDocument();
    userEvent.click(letter);

    const search = screen.getByTestId('search-top-btn');
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId('search-input');
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'A');

    const searchButton = screen.getByTestId('exec-search-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=A');
  });
});
