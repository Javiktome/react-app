/* eslint-disable max-len */
import React, {useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import ProfilePictures from './views/MyFiles';
import Single from './views/Single';
import Login from './views/Login';
import Register from './views/Register';
import UploadMedia from './views/Upload';
import {MediaContext} from './contexts/MediaContext';
import {checkUserAvailable} from './hooks/ApiHooks';
import EditMedia from './views/Edit';

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
          <Route path="/edit-media/:id">
            <Layout>
              <EditMedia />
            </Layout>
          </Route>
          <Route path="/myFiles">
            <Layout>
              <ProfilePictures />
            </Layout>
          </Route>
          <Route path="/home">
            <Layout>
              <Home />
            </Layout>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/upload-media">
            <UploadMedia />
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
    console.log(
        '----pathname---',
        router.location.pathname,
        user && user.email && router.location.pathname == '/',
    );
    if (user && user.email && router.location.pathname == '/') {
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
