import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import reducer from './reducer';
import App from './components/App/App';
import configureStore from './store/configureStore';

const store = configureStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
