import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import Alert from '../components/Alert';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const Form = ({ history, notificationCount, setNotificationCount }) => {
  const [createdBy, setcreatedBy] = useState('');
  const [department, setDepartment] = useState('');
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formError, setFormError] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [error, setError] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userCred } = userLogin;

  useEffect(() => {
    if (userCred) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userCred.token}`,
        },
      };

      axios
        .get('/api/users', config)
        .then((res) => {
          setUsers(
            res.data.data.users.filter((user) => user._id !== userCred._id)
          );
        })
        .catch((error) => {
          console.log(error);
          // setError('Invalid email or password');
        });

      axios
        .get('/api/departments', config)
        .then((res) => {
          setDepartments(
            res.data.data.departments.filter(
              (dept) => userCred.department !== dept._id
            )
          );
        })
        .catch((error) => {
          console.log(error);
          // setError('Invalid email or password');
        });
    } else {
      history.push('/login');
    }
  }, [history, userCred]);

  const onClickHandler = (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCred.token}`,
      },
    };

    axios
      .get(`/api/departments/${id}`, config)
      .then((res) => {
        setUsers(res.data.data.department.users);
      })
      .catch((error) => {
        console.log(error);
        // setError('Invalid email or password');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userCred.name !== createdBy) {
      setError('Username is incorrect');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCred.token}`,
      },
    };

    axios
      .post(
        '/api/requests',
        { createdBy: createdBy, createdFor: user, message },
        config
      )
      .then((res) => {
        setFormError('');
        setSuccessAlert(true);
        setNotificationCount(notificationCount + 1);
        // setDepartments([...res.data.data.departments]);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setSuccessAlert(false);
        setFormError(
          error.response.data.message ===
            `Cannot read property 'department' of null`
            ? 'Please enter valid credentials'
            : error.response.data.message
        );
      });
  };

  return (
    <Grid container className='form'>
      <Grid item sm />
      <Grid item sm>
        <br />
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='name'
            name='name'
            type='text'
            label='Username'
            className='textField'
            helperText={error}
            error={error ? true : false}
            value={createdBy}
            onChange={(e) => setcreatedBy(e.target.value)}
            fullWidth
            required={true}
          />
          <br />
          <br />
          <InputLabel id='demo-controlled-open-select-label'>
            Department
          </InputLabel>
          <Select
            displayEmpty
            required={true}
            className='selectEmpty'
            inputProps={{ 'aria-label': 'Without label' }}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            fullWidth>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {!loading &&
              departments.map((department, i) => (
                <MenuItem
                  key={i}
                  value={department.departmentName}
                  onClick={() => onClickHandler(department._id)}>
                  {department.departmentName}
                </MenuItem>
              ))}
          </Select>
          <br />
          <br />
          <InputLabel id='demo-controlled-open-select-label'>To</InputLabel>
          <Select
            displayEmpty
            required={true}
            className='selectEmpty'
            inputProps={{ 'aria-label': 'Without label' }}
            value={user}
            onChange={(e) => setUser(e.target.value)}
            fullWidth>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {!loading &&
              users.map((user, i) => (
                <MenuItem key={i} value={user.name}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
          <br />
          <br />
          <TextField
            id='outlined-textarea'
            label='Message'
            placeholder='Message'
            rows={4}
            multiline
            variant='outlined'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            required={true}
          />
          <br />
          {successAlert && (
            <Alert alertType='success'>{'Request successfully sent!'}</Alert>
          )}
          {formError && <Alert alertType='error'>{formError}</Alert>}
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='button'
            style={{ marginLeft: 'auto' }}
            disabled={loading}>
            Submit
            {loading && <CircularProgress size={30} className='progress' />}
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withRouter(withStyles(styles)(Form));
