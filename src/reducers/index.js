import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import usuario from './usuario';
import local from './local';
import autor from './autor';
import rubrica from './rubrica';
import livro from './livro';

const rootReducer = combineReducers({
  usuario,
  local,
  autor,
  rubrica,
  livro,
  router: routerReducer,
});

export default rootReducer;
