import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Selector from '../../components/Selector/Selector';
import DevTools from '../../common/DevTools';
import { selectCountry } from './AppActions';
import './App.styl';

class App extends Component {
  static sortCountriesByName(first, second) {
    return first.name > second.name ? 1 : -1;
  }

  render() {
    const shouldShowDevTools = WP_IS_DEV;
    const { countries } = this.props;
    const sortedCountries = countries.sort(App.sortCountriesByName);

    return (
      <div className="app">
        <p className="app__selected-country">
          Selected country code:&nbsp;
          <span className="app__country-data">
            {
              this.props.selectedCountry ?
                this.props.selectedCountry.code :
                'none'
            }
          </span>
        </p>
        <div className="app__country-selector">
          <Selector
            itemList={sortedCountries}
            selected={this.props.selectedCountry}
            onSelect={this.props.selectCountry}
          />
        </div>
        {shouldShowDevTools && <DevTools />}
      </div>
    );
  }
}

App.propTypes = {
  countries: PropTypes.array(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired
  ),
  selectedCountry: PropTypes.object(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })
  ),
  selectCountry: PropTypes.func.isRequired,
};

App.defaultProps = {
  selectedCountry: null,
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    selectedCountry: state.selectedCountry,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCountry: (country) => {
      dispatch(selectCountry(country))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
