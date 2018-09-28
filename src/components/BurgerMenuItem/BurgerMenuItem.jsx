import React, {PureComponent} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class BurgerMenuItem extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    item: {}
  };

  handleClick = () => {
    let {item, onClick} = this.props;
    onClick(item);
  };

  render() {
    let {item, isActive} = this.props;

    let menuItemClasses = classNames({
      'burger-menu__link': true,
      'active': isActive
    });

    return(
      <li className="burger-menu__item">
        <Link to={item.link} className={menuItemClasses} onClick={this.handleClick}>{item.name}</Link>
      </li>
    );
  };
}
