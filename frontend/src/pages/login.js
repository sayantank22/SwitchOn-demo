import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { login } from '../actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const Login = ({ history, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userCred } = userLogin;

  useEffect(() => {
    if (userCred) {
      history.push('/');
    }
  }, [history, userCred]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch Login
    dispatch(login(email, password));
  };
  return (
    <Grid container className='form'>
      <Grid item sm />
      <Grid item sm style={{ textAlign: 'center' }}>
        <br />
        <Typography variant='h3' className='pageTitle'>
          SwitchOn
        </Typography>
        <form noValidate onSubmit={submitHandler}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className='textField'
            helperText={error}
            error={error ? true : false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className='textField'
            helperText={error}
            error={error ? true : false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='button'
            disabled={loading}>
            Login
            {loading && <CircularProgress size={30} className='progress' />}
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withRouter(withStyles(styles)(Login));
