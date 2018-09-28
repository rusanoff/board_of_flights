import React, {PureComponent, Fragment} from 'react';
import './FlightList.scss';
import PropTypes from 'prop-types';

import Flight from 'components/Flight';
import FlightBlock from 'components/FlightBlock';

export default class FlightList extends PureComponent {

  static propTypes = {
    flights: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    )
  };

  static defaultProps = {
    flights: []
  };

  render() {
    let {match, flights} = this.props;

    return(
      <Fragment>
        <table className="table fade-in">
          <tbody>
            {flights.map((flight, id) => <Flight key={id} flight={flight} match={match} />)}
          </tbody> 
        </table>
        <div className="flights-block">
          {flights.map((flight, id) => <FlightBlock key={id} flight={flight} match={match} />)}
        </div>
      </Fragment>
    );
  }
}
