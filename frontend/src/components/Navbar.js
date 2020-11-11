import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Notification from './Notification';
import { logout } from '../actions/userActions';

const Navbar = ({ notificationCount, setNotificationCount }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userCred } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <AppBar>
      <Toolbar>
        {userCred ? (
          <>
            <div className='nav-container'>
              <Button color='inherit' component={Link} to='/'>
                Form
              </Button>
              <Button color='inherit' component={Link} to='/pending'>
                Pending
              </Button>
              <Button color='inherit' component={Link} to='/approved'>
                Approved
              </Button>
              <Button color='inherit' component={Link} to='/rejected'>
                Rejected
              </Button>
              <Button
                style={{ float: 'right' }}
                color='inherit'
                component={Link}
                to='/login'
                onClick={logoutHandler}>
                Logout
              </Button>
            </div>
            <div style={{ marginRight: '30px' }}>
              <Notification
                notificationCount={notificationCount}
                setNotificationCount={setNotificationCount}
              />
            </div>
          </>
        ) : (
          <div className='nav-container'>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
