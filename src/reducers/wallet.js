import { FETCH_CURRENCIES, SAVE_EXPENSES } from '../store/actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter(
        (coin) => coin !== 'USDT',
      ),
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        { id: state.expenses.length, ...action.payload }],
    };
  default:
    return state;
  }
};

export default wallet;
