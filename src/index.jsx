import React, {Component, Fragment} from 'react';
import './assets/style.scss';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import routes from './routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <section className="body">
          <Switch>
            {routes.map((route, id) => <Route key={id} {...route} />)}
          </Switch>
        </section>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));