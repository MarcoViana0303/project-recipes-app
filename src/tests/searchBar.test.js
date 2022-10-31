import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const ID_INGREDENTES = 'ingredient-search-radio';
const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const SEARCH_EXEC = 'exec-search-btn';

describe('01 - Testando o componente SearchBar da pagina meals', () => {
  afterEach(() => jest.clearAllMocks());
  test('Verifica se o alert com a mensagem "Your search must have only 1 (one) character" aparece na tela', () => {
    window.alert = jest.fn();

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const letter = screen.getByText(/primeira letra/i);
    expect(letter).toBeInTheDocument();
    userEvent.click(letter);

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'Ab');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });

  // it('Verifica se o alert com a mensagem "Your search must have only 1 (one) character" aparece na tela quando nada é encontrado', () => {
  //   window.alert = jest.fn();

  //   const { history } = renderWithRouter(<App />);

  //   act(() => {
  //     history.push('/drinks');
  //   });

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/drinks');
  //   console.log(pathname);

  //   const name = screen.getByText(/nome/i);
  //   expect(name).toBeInTheDocument();
  //   userEvent.click(name);

  //   const search = screen.getByTestId(SEARCH_BTN);
  //   expect(search).toBeInTheDocument();
  //   userEvent.click(search);

  //   const text = screen.getByTestId(SEARCH_INPUT);
  //   expect(text).toBeInTheDocument();
  //   userEvent.type(text, 'xablau');

  //   const searchButton = screen.getByTestId(SEARCH_EXEC);
  //   expect(searchButton).toBeInTheDocument();
  //   userEvent.click(searchButton);

  //   expect(window.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  // });

  test('Verifica a URL se esta sendo chamada corretamente para o imput letter na pg meals', () => {
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

    const letter = screen.getByText(/primeira letra/i);
    expect(letter).toBeInTheDocument();
    userEvent.click(letter);

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'a');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
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

    const name = screen.getByText(/nome/i);
    expect(name).toBeInTheDocument();
    userEvent.click(name);

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'Arrabiata');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
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

    const radio = screen.getByTestId(ID_INGREDENTES);
    expect(radio).toBeInTheDocument();

    const letter = screen.getByText(/ingrediente/i);
    expect(letter).toBeInTheDocument();
    userEvent.click(letter);

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'chicken');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });
});

describe('02 - Testando o componente SearchBar da pagina Drinks', () => {
  afterEach(() => jest.clearAllMocks());
  // beforeEach(cleanup);

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

    const radio = screen.getByTestId(ID_INGREDENTES);
    expect(radio).toBeInTheDocument();

    const letter = screen.getByText(/primeira letra/i);
    expect(letter).toBeInTheDocument();
    userEvent.click(letter);

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'a');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
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

    const radio = screen.getByTestId(ID_INGREDENTES);
    expect(radio).toBeInTheDocument();

    const name = screen.getByText(/nome/i);
    expect(name).toBeInTheDocument();
    userEvent.click(name);

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'Arrabiata');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
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

    const radio = screen.getByTestId(ID_INGREDENTES);
    expect(radio).toBeInTheDocument();

    const ingredientes = screen.getByText(/ingrediente/i);
    expect(ingredientes).toBeInTheDocument();
    userEvent.click(ingredientes);

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'Arrabiata');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Arrabiata');
  });

  test('Verifica a URL esta sendo chamada corretamente para o imput primeira letra', () => {
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

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'A');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=A');
  });
});
