import { combineReducers } from 'redux';

import {
  countries,
  selectedCountry,
} from './components/App/AppReducers';

export default combineReducers({
  countries,
  selectedCountry,
});
