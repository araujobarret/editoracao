import * as types from '../constants/ActionTypes';
import { LOGIN_LOCAL_STORAGE, TOKEN_LOCAL_STORAGE } from '../constants/Api';

const initialState = {
  login: '',
  token: '',
  erro: ''
}

const usuario = (state = initialState, action) => {
  switch(action.type){
    case types.LOGIN:
      localStorage.setItem(LOGIN_LOCAL_STORAGE, action.login);
      return {
        ...state,
        login: action.login,
        token: action.token
      };
    case types.LOGOUT:
      localStorage.removeItem(TOKEN_LOCAL_STORAGE);
      return initialState;
    case types.LOGIN_ERRO:
      return {
        ...state,
        erro: action.erro
      };
    default:
      return state;
  }
}

export default usuario;
