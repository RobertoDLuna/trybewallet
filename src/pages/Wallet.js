import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../store/actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <header>
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.user.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  fetchCoins: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
