import React, {PureComponent, Fragment} from 'react';

import FlightList from 'components/FlightList';
import Loader from 'components/Loader';
import FlightNotFound from 'components/FlightNotFound';
import Menu from 'components/Menu';

export default class AppContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      flightNumber: '',
      loading: false,
      flightNotFound: false,
      searching: false
    };

    this.menuItems = [
      {
        name: 'Вылет',
        link: '/departure'
      },
      {
        name: 'Прилет',
        link: '/arrival'
      },
      {
        name: 'Задержанные рейсы',
        link: '/delayed'
      }
    ];
  }

  handlePropertyChange = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.findFlight();
    }
  }

  setResponseData = (data) => {
    data = this.state.searching ? data.filter(item => this.state.flightNumber === item.flight_number) : data;

    this.setState({
      flights: data,
      loading: false,
      flightNotFound: !data.length
    });
  };

  setResponseError = (e) => {
    if (e instanceof SyntaxError) {
      console.log(e);
    } else {
      alert('Сервис для получения данных временно не доступен');
      console.log(e);
    }

    this.setState({
      flights: [],
      loading: false
    });
  };

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
      xhr.open('GET', `http://localhost:3000/${flightType}?delayed=true`, true);
      xhr.send();
    });
  };

  setDelayedFlightsData = () => {
    let departurePromise = this.getDelayedFlights('departure'),
        arrivalPromise = this.getDelayedFlights('arrival');

    Promise.all([departurePromise, arrivalPromise])
      .then( ([departure, arrival]) => this.setResponseData( departure.concat(arrival) ) )
      .catch( e => this.setResponseError(e) ); 
  };

  setFlightsData = (match) => {
    fetch(`http://localhost:3000/${match.params.flightType}`)
      .then( response => response.json() )
      .then( flights => this.setResponseData(flights) )
      .catch( e => this.setResponseError(e));
  };

  setDataByRouteParam = (match) => {
    this.setState({
      loading: true
    });

    if (match.params.flightType === 'delayed') {
      this.setDelayedFlightsData();
    }
    else {
      this.setFlightsData(match);
    }
  };

  findFlight = () => {
    if (this.state.flightNumber === '') {
      return false;
    }

    let {match} = this.props;

    this.setState({
      searching: true
    });

    this.setDataByRouteParam(match);
  };

  clearSearch = () => {
    if (this.state.searching) {
      this.setDataByRouteParam(this.props.match);
    }

    this.setState({
      flightNotFound: false,
      searching: false,
      flightNumber: ''
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.match !== prevProps.match) {
      if (this.state.searching === true) {
        document.getElementById('search-request').click();
      } 
      else {
        this.setDataByRouteParam(this.props.match);
        this.setState({
          flightNotFound: false
        });
      }
    }
  };

  componentDidMount() {
    this.setDataByRouteParam(this.props.match);
  };

  render() {
    let {flights, loading, flightNumber, flightNotFound} = this.state;
    let {match} = this.props;

    return(
      <Fragment>
        <Menu items={this.menuItems} match={match}/>
        <form className="form" action="/">
          <div className="search-form">
            <input 
              className="search-form__input"
              type="text" name="search" 
              id="search" 
              value={flightNumber} 
              autoComplete="off"
              placeholder="Поиск по номеру рейса"
              onChange={this.handlePropertyChange('flightNumber')}
              onKeyPress={this.handleKeyPress}
            />
            <span className="search-form__btn" id="search-request" onClick={this.findFlight}>
              Искать
            </span>
            <span className="search-form__btn" onClick={this.clearSearch}>
              Отменить
            </span>
          </div>
        </form>
        {loading ? <Loader /> : flightNotFound ? <FlightNotFound /> : <FlightList flights={flights} match={match} />}
      </Fragment>
    );
  };
}
