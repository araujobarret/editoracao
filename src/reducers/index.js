import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import usuario from './usuario';
import local from './local';
import autor from './autor';

const rootReducer = combineReducers({
  usuario,
  local,
  autor,
  router: routerReducer
});

export default rootReducer;
