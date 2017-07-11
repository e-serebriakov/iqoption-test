import countriesData from './countries.json';
import { SELECT_COUNTRY } from './AppActions';

export function countries(state = countriesData) {
  return state;
}

export function selectedCountry(state = null, action = {}) {
  switch (action.type) {
    case SELECT_COUNTRY:
      return action.payload;
    default:
      return state;
  }
}
