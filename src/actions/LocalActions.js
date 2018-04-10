import axios from 'axios';
import * as types from '../constants/Api';
import { SET_LOCAIS, ERRO } from '../constants/ActionTypes';
import { ERRO_COMUNICACAO} from '../constants/MensagensLogin';

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
