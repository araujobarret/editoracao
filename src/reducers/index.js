import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import usuario from './usuario';
import local from './local';

const rootReducer = combineReducers({
  usuario,
  local,
  router: routerReducer
});

export default rootReducer;
