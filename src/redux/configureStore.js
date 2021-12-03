import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import users from './modules/users';

const history = createBrowserHistory();

const middlewares = [thunk, routerMiddleware(history)];

const reducer = combineReducers({
  users,
  routing: routerReducer,
});

let store = initialState => createStore(reducer, applyMiddleware(...middlewares));

export { history };

export default store();