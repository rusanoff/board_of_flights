import MainScreen from 'components/MainScreen';
import FlightDetail from 'containers/FlightDetailContainer';
import AppContainer from 'containers/AppContainer';

export default [
  {
    path: '/',
    component: MainScreen,
    exact: true,
  },
  {
    path: '/:flightType',
    component: AppContainer,
    exact: true,
  },
  {
    path: '/:flightType/:id',
    component: FlightDetail,
  }
];