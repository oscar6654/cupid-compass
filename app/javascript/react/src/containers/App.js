import React from 'react';
// import {Router,browserHistory,Route,IndexRoute} from 'react-router';
import NavBar from '../components/NavBar';
import { Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom';
import Locations from './Locations';
import LocationForm from './LocationForm';
import Location from './Location';

const history = createBrowserHistory();

const App = props =>{
  return(
    <div>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path='/locations' component={Locations} />
          <Route exact path='/locations/new' component={LocationForm} />
          <Route exact path='/locations/:id' component={Location} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
