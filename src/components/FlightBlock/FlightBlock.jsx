import React, {PureComponent, Fragment} from 'react';
import './FlightBlock.scss';

import PropTypes from 'prop-types';

export default class FlightBlock extends PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    flight: PropTypes.shape({
      id: PropTypes.string.isRequired,
      arrival_time: PropTypes.string.isRequired,
      departure_time: PropTypes.string.isRequired,
      city_from: PropTypes.string.isRequired,
      city_to: PropTypes.string.isRequired,
      airline: PropTypes.string.isRequired,
      airline_iata: PropTypes.string.isRequired,
      flight_number: PropTypes.string.isRequired,
      delayed : PropTypes.bool.isRequired,
      terminal: PropTypes.string.isRequired,
      delay_time: PropTypes.string.isRequired,
      new_arrival_time: PropTypes.string.isRequired,
      new_departure_time: PropTypes.string.isRequired,
    }).isRequired
  };

  static defaultProps = {
    flight: {}
  };

  followingToFlightDetail = () => {
    let {match, flight} = this.props;
    this.context.router.history.push(`/${match.params.flightType}/${flight.id}`);
  };

  render() {
    let {flight} = this.props;

    return(
      <div className="flight-cell" onClick={this.followingToFlightDetail}>
        <div className="flight-cell__left">
          <div className="flight-cell__time">
            {
              flight.delayed
              &&
              <Fragment>
                <span className="flight-cell__time_delayed">
                  {flight.type === 'Вылет' ? flight.new_departure_time : flight.new_arrival_time}
                </span>
                <br/>
              </Fragment>
            }
            <span className={flight.delayed ? "flight-cell__time_crossed" : ""}>
              {flight.type === 'Вылет' ? `${flight.departure_time} ` : `${flight.arrival_time} `}
            </span>
          </div>
          <div className="flight-cell__terminal">
            {flight.terminal}
          </div>
        </div>
        <div className="flight-cell__right">
          <div className="flight-cell__city">
            {flight.type === 'Вылет' ? flight.city_to : flight.city_from}
          </div>
          <div className="flight-cell__flight-number">
            <span className="table__cell_text-normal">
              {flight.airline} {flight.airline_iata}&nbsp;
            </span>
            {flight.flight_number}
          </div>
        </div>
      </div>
    );
  }
}

FlightBlock.contextTypes = {
  router: PropTypes.object.isRequired
}
