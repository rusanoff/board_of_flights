import React, {PureComponent, Fragment} from 'react';
import './FlightDetail.scss';

import PropTypes from 'prop-types';

export default class FlightDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  static propTypes = {
      id: PropTypes.string,
      arrival_time: PropTypes.string,
      departure_time: PropTypes.string,
      city_from: PropTypes.string,
      city_to: PropTypes.string,
      airline: PropTypes.string,
      airline_iata: PropTypes.string,
      flight_number: PropTypes.string,
      delayed : PropTypes.bool,
      type: PropTypes.string,
      terminal: PropTypes.string,
      delay_time: PropTypes.string,
      new_arrival_time: PropTypes.string,
      new_departure_time: PropTypes.string,
  };

  componentDidMount() {
    this.setState({
      loaded: true
    });

    let infoBars = document.getElementsByClassName('flight-info__bar');

    setTimeout(() => {
      infoBars[0].classList.add('slide-up');
      infoBars[1].classList.add('slide-up');
    }, 300);
  }

  render() {
    let {
      id, arrival_time, departure_time, city_from, city_to, terminal,
      airline, airline_iata, flight_number, delayed, delay_time, type, 
      new_arrival_time, new_departure_time
    } = this.props;

    let {loaded} = this.state;

    return(
      <div className="flight">
        <header className={loaded ? "flight-header fade-in" : "flight-header"}>
          <h1 className="flight-header__title">
            Рейс <span className="flight-header__title_yellow">{id}</span>:&nbsp;
            {window.screen.width < 768 && <br/>} 
            {city_from} - {city_to} ({type}) 
          </h1>
        </header>
        <div className="flight-info">
          <div className="flight-info__bar">
            <div className={delayed ? "flight-info__text flight-info__text_transparent" : "flight-info__text"}>
              Время вылета: <time className="flight-info__time">{departure_time}</time>
            </div>
            <div className={delayed ? "flight-info__text flight-info__text_transparent" : "flight-info__text"}>
              Время прилета: <time className="flight-info__time">{arrival_time}</time>
            </div>
            {
              delayed 
              &&
              <Fragment>
                <div className="flight-info__text">
                  Рейс задержан на <time className="flight-info__time flight-info__time_error">{delay_time}</time>
                </div>
                <div className="flight-info__text">
                  Новое время вылета <time className="flight-info__time">{new_departure_time}</time>
                </div>
                <div className="flight-info__text">
                  Новое время прилета <time className="flight-info__time">{new_arrival_time}</time>
                </div>
              </Fragment>
            }
          </div>
          <div className="flight-info__bar">
            <div className="flight-info__text">
              Компания: <strong className="flight-info__text_bold">{airline}</strong>
            </div>
            <div className="flight-info__text">
              IATA: <strong className="flight-info__text_bold">{airline_iata}</strong>
            </div>
            <div className="flight-info__text">
              Номер рейса: <strong className="flight-info__text_bold">{flight_number}</strong>
            </div>
            <div className="flight-info__text">
              Прилетает в терминал <strong className="flight-info__text_bold">{terminal}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
}