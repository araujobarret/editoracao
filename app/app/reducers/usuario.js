import * as types from '../constants/ActionTypes';
import axios from 'axios';

const initialState = {
  login: '',
  token: ''
}

const usuario = (state = initialState, action) => {
  switch(action.type){
    case types.LOGIN:
      return state;
    case types.LOGOUT:
      return state;
    case types.LOGIN_ERRO:
      return state;
    default:
      return state;
  }
}

export default usuario;
