import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Pending({
  history,
  notificationCount,
  setNotificationCount,
}) {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userCred } = userLogin;

  const acceptHandler = (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCred.token}`,
      },
    };

    console.log(userCred._id);

    axios
      .put(
        `/api/requests/${id}`,
        { createdBy: userCred.name, isApproved: true },
        config
      )
      .then((res) => {
        // setNotificationCount(notificationCount + 1);
        // console.log(res.data);
        // setFormError('');
        // setSuccessAlert(true);
        // setDepartments([...res.data.data.departments]);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // setSuccessAlert(false);
        // setFormError(
        //   error.response.data.message ===
        //     `Cannot read property 'department' of null`
        //     ? 'Please select the user and department field'
        //     : error.response.data.message
        // );
      });
    setNotificationCount(notificationCount + 1);
  };

  const rejectHandler = (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userCred.token}`,
      },
    };

    axios
      .put(
        `/api/requests/${id}`,
        { createdFor: userCred.name, isRejected: true },
        config
      )
      .then((res) => {
        // setNotificationCount(notificationCount + 1);
        // console.log(res.data);
        // setFormError('');
        // setSuccessAlert(true);
        // setDepartments([...res.data.data.departments]);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // setSuccessAlert(false);
        // setFormError(
        //   error.response.data.message ===
        //     `Cannot read property 'department' of null`
        //     ? 'Please select the user and department field'
        //     : error.response.data.message
        // );
      });
    setNotificationCount(notificationCount + 1);
  };

  useEffect(() => {
    if (userCred) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userCred.token}`,
        },
      };

      axios
        .get('/api/requests', config)
        .then((res) => {
          const filteredRequests = res.data.data.requests.filter(
            (req) => req.isPending === true
          );
          setRequests([...filteredRequests]);
        })
        .catch((error) => {
          console.log(error);
          // setError('Invalid email or password');
        });
    } else {
      history.push('/login');
    }
  }, [history, userCred]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>createdBy</StyledTableCell>
            <StyledTableCell align='right'>createdFor</StyledTableCell>
            <StyledTableCell align='right'>createdAt</StyledTableCell>
            <StyledTableCell align='right'>Message</StyledTableCell>
            <StyledTableCell align='right'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            requests.map((request) => (
              <StyledTableRow key={request._id}>
                <StyledTableCell component='th' scope='request'>
                  {request.createdBy}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {request.createdFor}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {request.createdAt}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {request.message}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <div className={classes.buttons}>
                    <Button
                      style={{ margin: '10px 10px' }}
                      variant='contained'
                      color='primary'
                      onClick={() => acceptHandler(request._id)}
                      disabled={
                        request.createdFor === userCred.name ? false : true
                      }>
                      Accept
                    </Button>
                    <Button
                      style={{ margin: '10px 10px' }}
                      variant='contained'
                      color='secondary'
                      onClick={() => rejectHandler(request._id)}
                      disabled={
                        request.createdFor === userCred.name ? false : true
                      }>
                      Reject
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
