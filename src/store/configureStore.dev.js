import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../common/DevTools';

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument(),
);

export default function (rootReducer, initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    enhancer,
  );
}
