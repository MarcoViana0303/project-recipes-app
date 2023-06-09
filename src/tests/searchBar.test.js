import React from 'react';
import { screen, waitFor } from '@testing-library/react'; // cleanup
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import mockArrabiata from './helpers/mockMealsArrabiata';
// import mockMaels from './helpers/mockMeals';
// import mockButton from './helpers/mockButton';

const ID_INGREDENTES = 'ingredient-search-radio';
const SEARCH_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const SEARCH_EXEC = 'exec-search-btn';

beforeEach(() => jest.clearAllMocks());
afterEach(() => jest.clearAllMocks());

describe('01 - Testando o componente SearchBar da pagina meals', () => {
  // afterEach(() => jest.clearAllMocks());
  it.only('', async () => {
    // jest.clearAllMocks();
    global.fetch = jest.fn(async (endpoint) => {
      console.log(endpoint, 'sim, entrei');
      return {
        json: async () => {
          const endpointMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
          const endpointArrabiata = 'https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata';
          const endpointButton = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

          if (endpoint === endpointMeals) {
            return mockMaels;
          }
          if (endpoint === endpointArrabiata) {
            console.log('endpoint');
            return mockArrabiata;
          }
          if (endpoint === endpointButton) {
            return mockButton;
          }
        },
      };
    });

    const { history } = renderWithRouter(<App />, '/meals');

    // act(() => {
    //   history.push('/meals');
    // });

    // expect(pathname).toBe('/meals');

    const name = screen.getByText(/nome/i);
    expect(name).toBeInTheDocument();
    userEvent.click(name);

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'arrabiata');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    act(() => {
      userEvent.click(searchButton);
    });

    // await waitFor(() => { expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata'); }, { timeout: 4000 });
    console.log(history);
    await waitFor(() => { expect(screen.getByRole('heading', { name: /spicy arrabiata penne/i })).toBeInTheDocument(); });

    const { pathname } = history.location;
    console.log(pathname, 'pathname');
  });
  test.only('Verifica se o alert com a mensagem "Your search must have only 1 (one) character" aparece na tela', () => {
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

  test.only('Verifica a URL se esta sendo chamada corretamente para o imput letter na pg meals', () => {
    const { history } = renderWithRouter(<App />, '/meals');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
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
    act(() => {
      userEvent.click(searchButton);
    });

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

describe('', () => {
  // beforeEach(cleanup);
  it('Verifica se o alert com a mensagem "Your search must have only 1 (one) character" aparece na tela quando nada é encontrado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: null,
      }),
    });
    global.alert = jest.fn();

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
    console.log(pathname);

    const name = screen.getByText(/nome/i);
    expect(name).toBeInTheDocument();
    userEvent.click(name);

    const search = screen.getByTestId(SEARCH_BTN);
    expect(search).toBeInTheDocument();
    userEvent.click(search);

    const text = screen.getByTestId(SEARCH_INPUT);
    expect(text).toBeInTheDocument();
    userEvent.type(text, 'xablau');

    const searchButton = screen.getByTestId(SEARCH_EXEC);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    await waitFor(() => { expect(global.alert).toBeCalled(); }, { timeout: 4000 });
  });
});
