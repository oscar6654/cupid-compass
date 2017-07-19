import React from 'react';
// import {Router,browserHistory,Route,IndexRoute} from 'react-router';
import NavBar from '../components/NavBar'
import { Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import { BrowserRouter } from 'react-router-dom'

const history = createBrowserHistory();

const App = props =>{
  return(
    <div>
      <h1> Hello from inside the computer</h1>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path='/' component={NavBar} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
