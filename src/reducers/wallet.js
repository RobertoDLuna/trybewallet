import { FETCH_CURRENCIES } from '../store/actions/index';

const INITIAL_STATE = { currencies: [] };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter(
        (coin) => coin !== 'USDT',
      ),
    };
  default:
    return state;
  }
};

export default wallet;
