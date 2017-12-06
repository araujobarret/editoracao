import axios from 'axios';
import * as types from '../constants/ActionTypes';

// Checa se o token é valido
export const startCheckToken = (token) => {
  return false;
}

// Efetua login
const login = (token) => {
  return {
    type: types.LOGIN,
    token
  };
}

// Executa o login no backend
export const startLogin = (login, senha) => {
  return (dispatch, getState) => {
    return axios.post(types.USUARIO_LOGIN, {login, senha})
      .then((res) => console.log(JSON.stringify(res, null, 2)));
  }
};
