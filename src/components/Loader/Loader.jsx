import React, {PureComponent} from 'react';
import './Loader.scss';

export default class Loader extends PureComponent {
  render() {
    return(
      <div className="loader">
        <svg id="svg" width="100" height="100" viewport="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle className="loader__icon" id="bar" r="25" cx="50" cy="50" fill="transparent" strokeDasharray="120" strokeDashoffset="0"></circle>
        </svg>
      </div>
    );
  }
}
