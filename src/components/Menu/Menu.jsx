import React, {PureComponent} from 'react';
import './Menu.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MenuItem from 'components/MenuItem';
import BurgerMenuItem from 'components/BurgerMenuItem';

export default class Menu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: {},
      isToggleShow: false
    };
  }

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      })
    )
  };

  static defaultProps = {
    items: [],
  };

  handleItemClick = (selectedItem) => {
    this.setState({ 
      selectedItem 
    });
  };

  handleBurgerItemClick = (selectedItem) => {
    this.setState({ 
      selectedItem,
      isToggleShow: false 
    });

    document.body.style.overflowY = 'scroll';
  };

  openBurgerMenu = () => {
    this.setState(state => ({
      isToggleShow: !state.isToggleShow
    }));

    document.body.style.overflowY = !this.state.isToggleShow ? 'hidden' : 'scroll';
  }

  componentDidMount() {
    this.setState({ 
      selectedItem: {
        link: `/${this.props.match.params.flightType}`
      }
    });
  };

  render() {
    let {items} = this.props,
        {selectedItem, isToggleShow} = this.state;

    let burgerMenuClasses = classNames({
      'burger-menu': true,
      'hidden': !isToggleShow,
      'fade-in': isToggleShow
    });

    let burgerClasses = classNames({
      'burger': true,
      'open': isToggleShow
    });

    return(
      <nav className="menu">
        <ul className="menu__list">
          {items.map((item, id) => <MenuItem key={id} item={item} isActive={item.link === selectedItem.link} onClick={this.handleItemClick}/>)}
        </ul>
        <div className={burgerClasses} onClick={this.openBurgerMenu}>
          <span className="burger__line"></span>
          <span className="burger__line"></span>
          <span className="burger__line"></span>
        </div>
        <div className={burgerMenuClasses}>
          <ul className="burger-menu__list">
            {items.map((item, id) => <BurgerMenuItem key={id} item={item} isActive={item.link === selectedItem.link} onClick={this.handleBurgerItemClick}/>)}
          </ul>
        </div>
      </nav>
    );
  }
}
