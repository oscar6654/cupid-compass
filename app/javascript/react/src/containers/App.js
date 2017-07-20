import React from 'react';
// import {Router,browserHistory,Route,IndexRoute} from 'react-router';
import NavBar from '../components/NavBar';
import { Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom';
import Location from './Location';
import LocationForm from './LocationForm';

const history = createBrowserHistory();

const App = props =>{
  return(
    <div>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path='/locations' component={Location} />
          <Route exact path="/locations/new" component={LocationForm} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
