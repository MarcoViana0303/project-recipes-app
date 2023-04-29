import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function Login({ history }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { email, password, setEmail, setPassword } = useContext(AppContext);

  const validatorLogin = () => {
    const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MINIMUM_CHARACTERS = 6;
    const checkEmail = email.match(EMAIL_FORMAT);
    const checkPassword = password.length > MINIMUM_CHARACTERS;
    setIsButtonDisabled(!checkEmail || !checkPassword);
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  useEffect(() => {
    validatorLogin();
  }, [email, password]);

  return (
    <div className='container'>
      <form className='login-container'>
        <label htmlFor="email">
          <input
            type="email"
            data-testid="email-input"
            id="email"
            placeholder="E-mail"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            data-testid="password-input"
            id="password"
            placeholder="Senha"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <h6>Campos obrigatórios.*</h6>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default Login;
