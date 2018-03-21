import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const middleware = routerMiddleware(history);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(middleware, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
