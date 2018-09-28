import React, {PureComponent} from 'react';
import './Flight.scss';

import PropTypes from 'prop-types';

export default class Flight extends PureComponent {
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
      type: PropTypes.string.isRequired,
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
    let {match, flight} = this.props;

    return(
      <tr className="table__row" onClick={this.followingToFlightDetail}>
        <td className="table__cell table__cell_time">
          <span className={flight.delayed ? "table__cell_time_crossed" : ""}>
            {flight.type === 'Вылет' ? `${flight.departure_time} ` : `${flight.arrival_time} `}
          </span>
          {
            flight.delayed
            &&
            <span className="table__delayed">
              {flight.type === 'Вылет' ? flight.new_departure_time : flight.new_arrival_time}
            </span>
          }
        </td>
        {
          match.params.flightType === 'delayed'
          &&
          <td className="table__cell table__cell_type table__cell_text-normal">
            {flight.type}
          </td>
        }
        <td className="table__cell table__cell_text-left table__cell_city">
          {flight.type === 'Вылет' ? flight.city_to : flight.city_from}
        </td>
        <td className="table__cell table__cell_text-right">
          <span className="table__cell_text-normal">
            {flight.airline} {flight.airline_iata}
          </span> 
          {flight.flight_number}
        </td>
        <td className="table__cell table__cell_terminal">
          {flight.terminal}
        </td>
      </tr>
    );
  };
}

Flight.contextTypes = {
  router: PropTypes.object.isRequired
}
