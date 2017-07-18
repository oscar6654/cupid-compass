import React from 'react';
import {Router,browserHistory,Route} from 'react-router';
import NavBar from '../components/NavBar'

// <Router history = {browserHistory}>
// <Route path='/'>
// <IndexRoute component={NavBar}/>
// </Route>
// </Router>
const App = props =>{
  return(
    <h1> Hello from inside the computer</h1>
  )

}

export default App
