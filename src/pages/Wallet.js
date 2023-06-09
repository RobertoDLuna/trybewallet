import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, saveExchangeRates } from '../store/actions/index';

class Wallet extends React.Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangeRates: {},
  }

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  recordExpense = () => {
    const { saveExpense } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => {
        this.setState(() => ({ exchangeRates: json }));
      })
      .then(() => {
        saveExpense(this.state);
        this.setState({ value: '' });
      });
  };

  render() {
    const { userEmail, currencies, expenses } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">
          {!expenses ? 0 : expenses.reduce((acc, curr) => {
            acc += curr.value * curr.exchangeRates[curr.currency].ask;
            return acc;
          }, 0).toFixed(2)}
        </p>
        <p data-testid="header-currency-field">BRL</p>
        <form>
          <input
            type="text"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            placeholder="Valor da Despesa"
          />
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
            placeholder="Descrição da despesa"
          />
          <label htmlFor="coins">
            Moeda
            <select id="coins" name="currency" onChange={ this.handleChange }>
              {currencies.map((coin) => (
                <option key={ coin }>{coin}</option>
              ))}
            </select>
          </label>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="button" onClick={ this.recordExpense }>Adicionar despesa</button>
        </form>
        <table>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </table>
        <table>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {Number(expense.exchangeRates[expense.currency].ask
                * expense.value).toFixed(2)}
              </td>
              <td>Real</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCurrencies()),
  saveExpense: (payload) => dispatch(saveExchangeRates(payload)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  fetchCoins: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
