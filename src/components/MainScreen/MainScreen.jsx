import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import './MainScreen.scss';

export default class MainScreen extends PureComponent {
  render() {
    return(
      <div className="fullscreen">
        <Link to={'/departure'} className="fullscreen__btn">Показать табло</Link>
      </div>
    );
  }
}
