import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import './App.css';

import Navbar from './components/Navbar';
import Login from './pages/login';
import Form from './pages/form';
import Pending from './pages/pending';
import Approved from './pages/approved';
import Rejected from './pages/rejected';
import themeFile from './utils/theme';
// import AuthRoute from './middleware/AuthRoute';

const theme = createMuiTheme(themeFile);

const App = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
        />
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/'
              component={() => (
                <Form
                  notificationCount={notificationCount}
                  setNotificationCount={setNotificationCount}
                />
              )}
            />
            <Route exact path='/login' component={() => <Login />} />
            <Route
              exact
              path='/pending'
              component={() => (
                <Pending
                  notificationCount={notificationCount}
                  setNotificationCount={setNotificationCount}
                />
              )}
            />
            <Route exact path='/approved' component={() => <Approved />} />
            <Route exact path='/rejected' component={() => <Rejected />} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
