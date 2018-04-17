import axios from 'axios';
import * as types from '../constants/Api';
import { SET_LOCAIS, ADD_LOCAL, ERRO } from '../constants/ActionTypes';
import { ERRO_AUTENTICACAO, ERRO_COMUNICACAO} from '../constants/MensagensLogin';

// Erro de autenticação
export const erroLocal = (erro) => {
  return {
    type: ERRO,
    erro
  }
};

// Salva os locais no estado
export const setLocais = (locais) => {
  return {
    type: SET_LOCAIS,
    locais,
  };
};

// Retorna os locais do sistema
export const startGetLocais = () => {
  return (dispatch, getState) => {
    return axios({
      method: 'get',
      url: types.GET_LOCAIS,
      headers: types.HTTP_HEADER,
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      if(res.status === 200){
        dispatch(setLocais(res.data));
      }
      else {
        dispatch(erroLocal(ERRO_COMUNICACAO));
      }
    }).catch((e) => {
      dispatch(erroLocal(ERRO_COMUNICACAO));
    });
  };
}

export const addLocal = (mensagem) => {
 return {
   type: ADD_LOCAL,
   mensagem
 }
}

//Salva um novo Local
export const startAddLocal = (local, token) => {
  return (dispatch, getState) => {
    return axios({
      method: 'post',
      url: types.ADD_LOCAL,
      data: local,
      headers: types.GET_HTTP_HEADER(token),
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      console.log("res", res);
      if(res.status === 200){
        dispatch(addLocal('Local adicionado :)'));
      }
      else {
        console.log("Res Status", res.status);
        dispatch(erroLocal(ERRO_AUTENTICACAO));
      }
    }).catch((e) => {
      console.log("Error", e);
      dispatch(erroLocal(ERRO_COMUNICACAO));
    });
  };
}
