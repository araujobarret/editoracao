import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

export default function configureStore(initState) {
  const store = createStoreWithMiddleware(rootReducer, initState);

  return store;
}
