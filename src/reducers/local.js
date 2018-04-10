import * as types from '../constants/ActionTypes';
import axios from 'axios';

const initialState = {
  locais: null,
  erro: ''
}

const local = (state = initialState, action) => {
  switch(action.type){
    case types.SET_LOCAIS:
      return {
        locais: action.locais,
        erro: ''
      }
    case types.ERRO:
      return {
        locais: [],
        erro: action.erro
      }
      break;
    default:
      return state;
      break;
  }
}

export default local;
