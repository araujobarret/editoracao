import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import usuario from './usuario';
import local from './local';
import autor from './autor';
import rubrica from './rubrica';

const rootReducer = combineReducers({
  usuario,
  local,
  autor,
  rubrica,
  router: routerReducer
});

export default rootReducer;
