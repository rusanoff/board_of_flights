import React, {PureComponent} from 'react';
import './FlightNotFound.scss';

export default class FlightNotFound extends PureComponent {
  render() {
    return(
      <div className="notfound">
        <p className="notfound__paragraph">По вашему запросу ничего не найдено</p>
      </div>
    );
  }
}