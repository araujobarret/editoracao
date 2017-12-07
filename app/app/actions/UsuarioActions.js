import fetch from 'node-fetch';
import * as types from '../constants/Api';

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
    return fetch(types.USUARIO_LOGIN, {
      method: 'POST',
      body: JSON.stringify({ login, senha }),
      headers: { 'Content-Type': 'application/json', 'x-auth': '*' }
    }).then((res) => {        
        console.log(JSON.stringify(res, null, 2));
      })
      .catch((e) => console.log(e));
  }
};
