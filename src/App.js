/* eslint-disable max-len */
import React, {useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';
import {MediaContext} from './contexts/MediaContext';
import {checkUserAvailable} from './hooks/ApiHooks';

/**
 * App Function
 * @return {string}
 */
function App() {
  const [, setUser] = useContext(MediaContext);
  useEffect(() => {
    checkUserAvailable().then((res) => {
      setUser(res);
    });
  }, []);
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Nav />

        <Switch>
          <Route path="/profile">
            <Layout>
              <Profile />
            </Layout>
          </Route>
          <Route path="/media/:id">
            <Layout>
              <Single />
            </Layout>
          </Route>
          <Route path="/home">
            <Layout>
              <Home />
            </Layout>
          </Route>

          <Route path="/">
            <Layout>
              <Login />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const Layout = ({children}) => {
  const [user] = useContext(MediaContext);
  const router = useHistory();
  useEffect(() => {
    console.log('----pathname---', router.location.pathname);
    if (user && user.email && router.location.pathname=='/') {
      router.push('/home');
    } else if (user && user.message || !user) {
      router.push('/');
    }
  }, [user]);
  return (
    <>
      {children}
    </>);
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default App;
