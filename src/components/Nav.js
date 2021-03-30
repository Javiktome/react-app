/* eslint-disable max-len */
import React, {useContext, useState} from 'react';
import './nav.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import {Link} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {BottomNavigationAction, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 500,
    marginLeft: 'auto',
    background: 'transparent',
  },
  navbar: {
    background: '#1976d2',
  },
});

const Nav = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [value, setValue] = useState(0);
  return (
    <>
      <div className={classes.navbar}>
        <BottomNavigation
          value={value}
          onChange={(__, newValue) => setValue(newValue)}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction showLabel label={<Link to="/home">Home</Link>} />
          {user && user.email ? (
            <>
              <BottomNavigationAction
                showLabel
                label={<Link to="/profile">Profile</Link>}
              />
              <BottomNavigationAction
                showLabel
                label={
                  <Link
                    to="/"
                    onClick={() => {
                      localStorage.removeItem('token');
                      setUser(null);
                    }}
                  >
                    Logout
                  </Link>
                }
              />
            </>
          ) : (
            <BottomNavigationAction showLabel label={<Link to="/login">Login</Link>} />
          )}
        </BottomNavigation>
      </div>
    </>
  );
};

export default Nav;
