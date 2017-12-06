import * as types from '../constants/ActionTypes';

const initialState = {
  login: ''
  token: ''
}

const usuario = (state = initialState, action) => {
  switch(action.type){
    case types.LOGIN:

    case types.LOGOUT:

    default:
      return state;
  }
}

export default usuario;
