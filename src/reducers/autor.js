import * as types from '../constants/ActionTypes';

const initialState = {
  autores: null,
  mensagem: '',
  erro: ''
}

const autor = (state = initialState, action) => {
  switch(action.type){
    case types.SET_AUTORES:
      return {
        ...initialState,
        autores: action.autores,
      }
    case types.ADD_AUTOR:
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

export default autor;
