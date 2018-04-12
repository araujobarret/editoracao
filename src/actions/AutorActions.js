import axios from 'axios';
import * as types from '../constants/Api';
import { SET_AUTORES, ADD_AUTOR, ERRO } from '../constants/ActionTypes';
import { ERRO_AUTENTICACAO, ERRO_COMUNICACAO} from '../constants/MensagensLogin';

// Erro de autenticação
export const erroAutor = (erro) => {
  return {
    type: ERRO,
    erro
  }
};

// Salva os locais no estado
export const setAutores = (autores) => {
  return {
    type: SET_AUTORES,
    autores,
  };
};

// Retorna os locais do sistema
export const startGetAutores = () => {
  return (dispatch, getState) => {
    return axios({
      method: 'get',
      url: types.AUTOR,
      headers: types.HTTP_HEADER,
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      if(res.status === 200){
        dispatch(setAutores(res.data));
      }
      else {
        dispatch(erroAutor(ERRO_COMUNICACAO));
      }
    }).catch((e) => {
      dispatch(erroAutor(ERRO_COMUNICACAO));
    });
  };
}

export const addAutor = (mensagem) => {
 return {
   type: ADD_AUTOR,
   mensagem
 }
}

//Salva um novo Local
export const startAddAutor = (autor, token) => {
  return (dispatch, getState) => {
    return axios({
      method: 'post',
      url: types.AUTOR,
      data: autor,
      headers: types.GET_HTTP_HEADER(token),
      validateStatus: function (status) {
        return status >= 200 && status <= 401;
      }
    }).then((res) => {
      if(res.status === 200){
        dispatch(addAutor('Autor adicionado :)'));
      }
      else {
        dispatch(erroAutor(ERRO_AUTENTICACAO));
      }
    }).catch((e) => {
      dispatch(erroAutor(ERRO_COMUNICACAO));
    });
  };
}
