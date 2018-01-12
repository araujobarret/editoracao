import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

import usuario from './usuario'

const rootReducer = combineReducers({
  usuario,
  routing: routerReducer
});

export default rootReducer;
