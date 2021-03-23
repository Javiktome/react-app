/* eslint-disable max-len */
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';

/**
 * App Function
 * @return {string}
 */
function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Nav />

        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/media/:id">
            <Single />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/media/:id" component={Single} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch> */}
      </Router>
    </div>
  );
}

export default App;
