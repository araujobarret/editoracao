import * as types from '../constants/ActionTypes';
import axios from 'axios';

const initialState = {
  locais: null,
  mensagem: '',
  erro: ''
}

const local = (state = initialState, action) => {
  console.log("State", state);
  console.log("Action", action);
  switch(action.type){
    case types.SET_LOCAIS:
      return {
        ...initialState,
        locais: action.locais,
      }
    case types.ADD_LOCAL:
      return {
        ...state,
        mensagem: action.mensagem
      }
      break;
    case types.ERRO:
      return {
        ...state,
        erro: action.erro
      }
      break;
    default:
      return state;
      break;
  }
}

export default local;
