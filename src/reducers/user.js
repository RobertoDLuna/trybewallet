// Esse reducer será responsável por tratar as informações da pessoa usuária

import { USER_EMAIL } from '../store/actions';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
