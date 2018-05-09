import axios from 'axios';
import * as types from '../constants/Api';
import {LOGIN, LOGIN_ERRO, LOGOUT} from '../constants/ActionTypes';
import {ERRO_AUTENTICACAO, ERRO_COMUNICACAO} from '../constants/MensagensLogin';

// Erro de autenticação
export const erroLogin = (erro) => {
  return {
    type: LOGIN_ERRO,
    erro
  }
};

// Efetua logout
export const setLogout = () => {
  return {
    type: LOGOUT
  };
};

// Checa se o token é valido
export const startCheckToken = (token) => {
  return (dispatch, getState) => {
    return axios({
      method: 'post',
      url: types.USUARIO_CHECK_TOKEN,
      data: {token},
      headers: types.HTTP_HEADER,
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      if(res.status === 204){
        dispatch(setLogin(res.data, token));
      }
      else {
        // Remove o token
      }
    }).catch((e) => {
      dispatch(erroLogin(ERRO_COMUNICACAO));
    });
  };
};

// Efetua login
export const setLogin = (login, token) => {
  return {
    type: LOGIN,
    login,
    token
  };
};

// Executa o login no backend
export const startLogin = (login, senha) => {
  return (dispatch, getState) => {
    return axios({
      method: 'post',
      url: types.USUARIO_LOGIN,
      data: { login, senha },
      headers: types.HTTP_HEADER,
      validateStatus: function (status) {
        return status >= 200 && status <= 401; // default
      }
    }).then((res) => {
      if(res.status === 200){
        dispatch(setLogin(null, res.data));
      }
      else {
        dispatch(erroLogin(ERRO_AUTENTICACAO));
      }
    })
    .catch((e) => {
      console.log("Erro", e);
      dispatch(erroLogin(ERRO_COMUNICACAO));
    });
  };
};
