import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
);

export default function (rootReducer, initialState) {
  return createStore(
    rootReducer,
    initialState,
    enhancer,
  );
}
