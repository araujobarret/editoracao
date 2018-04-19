import * as types from '../constants/ActionTypes';

const initialState = {
  rubricas: null,
  mensagem: '',
  erro: ''
}

const rubrica = (state = initialState, action) => {
  switch(action.type){
    case types.SET_RUBRICAS:
      return {
        ...initialState,
        rubricas: action.rubricas,
      }
    case types.ADD_RUBRICA:
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

export default rubrica;
