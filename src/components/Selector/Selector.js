import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';

import './Selector.styl';

class Selector extends Component {
  /**
   * Return item text
   * @static
   * @param item
   * @param filter
   */
  static getItemText(item, filter) {
    if (filter.length) {
      const found = item.slice(0, filter.length);
      const rest = item.slice(filter.length);

      return (
        <span className="selector__item-text">
          <span className="selector__item-match-text">{found}</span>
          <span className="selector__item-rest-text">{rest}</span>
        </span>
      );
    }

    return <span className="selector__item-text">{item}</span>;
  }

  /**
   * Getter for drop orientation constats
   * @static
   * @returns {{up: string, down: string}}
   */
  static get DROP_ORIENTATION() {
    return {
      up: 'up',
      down: 'down',
    };
  }

  /**
   * Getter for arrow icon direction css class
   * @static
   * @returns {{up: string, down: string}}
   */
  static get ARROW_ICON_DIRECTION_CSS_CLASS() {
    return {
      up: 'selector__arrow-icon--up',
      down: 'selector__arrow-icon--down',
    };
  }

  /**
   * Return arrow icon direction css class
   * @static
   * @param dropOrientation
   * @param listShown
   * @returns {string}
   */
  static getArrowIconDirectionCssClass(dropOrientation, listShown) {
    if (
      dropOrientation === Selector.DROP_ORIENTATION.down && !listShown ||
      dropOrientation === Selector.DROP_ORIENTATION.up && listShown
    ) {
      return Selector.ARROW_ICON_DIRECTION_CSS_CLASS.down;
    }

    return Selector.ARROW_ICON_DIRECTION_CSS_CLASS.up;
  }

  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      listShown: false,
      dropOrientation: Selector.DROP_ORIENTATION.down,
      arrowIconDirectionCssClass: Selector.ARROW_ICON_DIRECTION_CSS_CLASS.down
    };

    this.showList = this::this.showList;
    this.hideList = this::this.hideList;
    this.selectItem = this::this.selectItem;
    this.changeFilter = this::this.changeFilter;
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    this.dropOrientation = this.getDropOrientation();
    const arrowIconDirectionCssClass = Selector.getArrowIconDirectionCssClass(this.dropOrientation, false);

    this.setState({
      arrowIconDirectionCssClass
    })
  }

  /**
   * Return item list drop orientation
   * @returns {string}
   */
  getDropOrientation() {
    if (!this.switch) {
      return;
    }

    const switchRect = this.switch.getBoundingClientRect();
    const listHeight = 200;

    if (switchRect.top - switchRect.height > listHeight) {
      return Selector.DROP_ORIENTATION.down;
    }
    return Selector.DROP_ORIENTATION.up;
  }

  /**
   * Show item list
   */
  showList() {
    const arrowIconDirectionCssClass = Selector.getArrowIconDirectionCssClass(this.dropOrientation, true);

    this.setState(
      {
        listShown: true,
        dropOrientation: this.dropOrientation,
        arrowIconDirectionCssClass
      },
      () => this.textInput.focus()
    )
  }

  /**
   * Hide item list
   */
  hideList() {
    const arrowIconDirectionCssClass = Selector.getArrowIconDirectionCssClass(this.dropOrientation, false);

    this.setState(
      {
        filter: '',
        listShown: false,
        arrowIconDirectionCssClass
      }
    );
  }

  /**
   * Change text input value
   * @param event
   */
  changeFilter(event) {
    this.setState({ filter: event.target.value });
    if (this.props.selected) {
      this.props.onSelect(null);
    }
  }

  /**
   * Filter items
   */
  getFilteredItems() {
    return this.props.itemList
      .filter(
        item => !item.name.toLowerCase().indexOf(this.state.filter.toLowerCase()),
      );
  }

  /**
   * Handle item select
   * @param event
   * @param item
   */
  selectItem(event, item) {
    this.setState(
      { filter: '' },
      () => this.props.onSelect(item)
    );
  }

  /**
   * Render custom selector
   */
  renderCustom() {
    const {
      filter,
      listShown,
      dropOrientation,
      arrowIconDirectionCssClass
    } = this.state;
    const filteredItems = this.getFilteredItems();
    const { selected } = this.props;

    return (
      <div className="selector">
        <div
          className="selector__switch"
          onClick={this.showList}
          ref={(switchEl) => { this.switch = switchEl }}
        >
          {
            listShown &&
            <input
              className="selector__search-input"
              value={filter}
              onChange={this.changeFilter}
              onBlur={this.hideList}
              ref={(inputEl) => { this.textInput = inputEl }}
              maxLength={25}
            />
          }

          <span
            className={
              `selector__placeholder ${listShown ?
                dropOrientation === Selector.DROP_ORIENTATION.down ?
                  'selector__placeholder--lifted' :
                  'selector__placeholder--down' :
                ''
                }`
            }
          >
            {
              listShown ?
                'Choose a country' :
                (selected && selected.name) || 'Choose a country'
            }
          </span>
          <span
            className={`selector__arrow-icon ${arrowIconDirectionCssClass}`}
          />
        </div>
        { listShown &&
          <ul className={`selector__list selector__list--shown_${dropOrientation} selector-list`}>
            {
              filteredItems.length > 0 ?
                filteredItems.map(item => (
                  <li
                    className="selector-list__item"
                    key={item.code}
                    onMouseDown={(event) => { this.selectItem(event, item) }}
                  >
                    {Selector.getItemText(item.name, filter)}
                  </li>
                )) :
                <div className="selector-list__item">
                  Nothing is found
                </div>
            }
          </ul>
        }
      </div>
    )
  }

  /**
   * Render mobile version of selector
   */
  renderNative() {
    const { itemList, selected } = this.props;

    return (
      <div className="native-selector-wrapper">
        <select
          className="selector selector--native"
          onChange={(event) => {
            this.selectItem(event, JSON.parse(event.target.value));
          }}
          value={JSON.stringify(selected) || ''}
        >
          {
            itemList.map(item => (
              <option
                className="selector__option"
                value={JSON.stringify(item)}
                key={item.code}
              >
                {item.name}
              </option>
            ))
          }
        </select>

        <span
          className={`selector__arrow-icon selector__arrow-icon--down`}
        />
      </div>
    );
  }

  /**
   * @inheritdoc
   */
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 960px)'>
          {this.renderCustom()}
        </MediaQuery>
        <MediaQuery query='(max-device-width: 960px)'>
          {this.renderNative()}
        </MediaQuery>
      </div>
    )
  }
}

Selector.propTypes = {
  itemList: PropTypes.array.isRequired,
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
};

Selector.defaultProps = {
  selected: null,
};

export default Selector;