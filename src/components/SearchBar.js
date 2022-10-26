import React from 'react';

function SearchBar() {
  return (
    <form>
      <div>
        <input
          type="radio"
          value="ingrediente"
          name="search"
          data-testid="ingredient-search-radio"
        />
        ingrediente
        <input
          type="radio"
          value="nome"
          name="search"
          data-testid="name-search-radio"
        />
        nome
        <input
          type="radio"
          value="letra"
          name="search"
          data-testid="first-letter-search-radio"
        />
        primeira letra
      </div>
      <button type="button" data-testid="exec-search-btn">Pesquisar</button>
    </form>
  );
}

export default SearchBar;
