import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveEmail from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',

  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  // onde peguei a expressão regular para validação de e-mail
  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  validateEmailAndPassword = () => {
    const minPassword = 6;
    const validateEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const { email, password } = this.state;
    return !(validateEmail.test(email) && password.length >= minPassword);
  }

  moveToWallet = () => {
    const { history, add } = this.props;
    const { email } = this.state;
    add(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>img</div>
        <div>
          <label htmlFor="email-input">
            Email:
            <input
              name="email"
              value={ email }
              type="email"
              placeholder="Digite seu email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input" placeholder="Digite sua senha">
            Senha:
            <input
              value={ password }
              name="password"
              type="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ this.validateEmailAndPassword() }
            onClick={ this.moveToWallet }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  add: PropTypes.func.isRequired,
};
