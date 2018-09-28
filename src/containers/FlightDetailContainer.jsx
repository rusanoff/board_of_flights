import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

import FlightDetail from 'components/FlightDetail';
import Loader from 'components/Loader';
import {Link} from 'react-router-dom';

export default class FlightDetailContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      flight: {},
      loading: false
    };
  }

  getDelayedFlights = (flightType) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
    
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } 
          catch(e) {
            reject(e);
          }
        } 
      };
      xhr.onerror = reject;
      xhr.open('GET', `http://localhost:3000/${flightType}`, true);
      xhr.send();
    });
  }

  componentDidMount() {
    let {match} = this.props,
        flightId = this.context.router.history.location.pathname.replace(`/${match.params.flightType}/`, '');
    
    this.setState({
      loading: true
    });

    if (match.params.flightType === 'delayed') {
      let departureFlightPromise = this.getDelayedFlights('departure'),
          arrivalFlightPromise = this.getDelayedFlights('arrival');

      Promise.all([departureFlightPromise, arrivalFlightPromise])
        .then(([departure, arrival]) => {
          this.setState({
            flight: departure.concat(arrival).filter(flight => flight.id === flightId)[0],
            loading: false,
          });
        })
        .catch((e) => {
          if(e instanceof SyntaxError) {
            console.log(e);
          } else {
            alert('Произошла ошибка. Сервер не доступен');
            console.log(e);
          }

          this.setState({
            flight: {},
            loading: false,
          });
        }); 
    }
    else {
      fetch(`http://localhost:3000/${match.params.flightType}/${match.params.id}`)
        .then((response) => response.json())
        .then((flight) => {
          this.setState({
            flight,
            loading: false
          });
        })
        .catch(() => {
          this.setState({
            flight: {},
            loading: false
          });
        });
    }
  }

  render() {
    let {flight, loading} = this.state;
    let {match} = this.props;

    return(
      <Fragment>
        <Link to={`/${match.params.flightType}`} className="btn-back"></Link>
        {loading ? <Loader /> : <FlightDetail {...flight} match={match}/>}
      </Fragment>
    );
  }
}

FlightDetailContainer.contextTypes = {
  router: PropTypes.object.isRequired
}