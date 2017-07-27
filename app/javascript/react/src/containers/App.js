import React from 'react';
import NavBar from '../components/NavBar';
import { Route, Switch,browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter, Link } from 'react-router-dom';
import Locations from './Locations';
import LocationForm from './LocationForm';
import Location from './Location';
import Review from './Review';
import ReviewForm from './ReviewForm'
import HomePage from './HomePage'

const history = createBrowserHistory();

const App = props =>{
  return(
    <div>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path='/locations/search/' component={HomePage} />
          <Route exact path='/locations' component={Locations} />
          <Route exact path='/locations/new' component={LocationForm} />
          <Route exact path='/locations/:id' component={Location} />
          <Route exact path='/locations/:id/reviews' component={Review} />
          <Route exact path='locations/:id/reviews/new' component={ReviewForm} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
