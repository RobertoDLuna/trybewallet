export const USER_EMAIL = 'USER_EMAIL';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const saveUserEmail = (payload) => ({
  type: USER_EMAIL,
  payload,
});

const saveCurrencies = (json) => ({
  type: FETCH_CURRENCIES,
  payload: json,
});

export const fetchCurrencies = () => (
  (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(saveCurrencies(json)));
  }
);
