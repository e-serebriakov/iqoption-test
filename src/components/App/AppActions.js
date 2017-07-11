export const SELECT_COUNTRY = 'App/selectCountry';

export function selectCountry(country) {
  return {
    type: SELECT_COUNTRY,
    payload: country,
  };
}
