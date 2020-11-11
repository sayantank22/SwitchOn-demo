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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withRouter } from 'react-router-dom';

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

const Approved = ({ history }) => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);

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
        .get('/api/requests', config)
        .then((res) => {
          const filteredRequests = res.data.data.requests
            .filter((req) => req.isApproved === true)
            .slice(0, 4);
          setRequests([...filteredRequests]);
        })
        .catch((error) => {
          console.log(error);
          // setError('Invalid email or password');
        });
    } else {
      history.push('/login');
    }
  }, [history, userCred, requests]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>RequestId</StyledTableCell>
            <StyledTableCell align='right'>CreatedBy</StyledTableCell>
            <StyledTableCell align='right'>CreatedFor</StyledTableCell>
            <StyledTableCell align='right'>CreatedAt</StyledTableCell>
            <StyledTableCell align='right'>Message</StyledTableCell>
            <StyledTableCell align='right'>Accepted</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            requests.map((request) => (
              <StyledTableRow key={request._id}>
                <StyledTableCell component='th' scope='request'>
                  {request._id}
                </StyledTableCell>
                <StyledTableCell align='right'>
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
                  <CheckCircleIcon />
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
};

export default withRouter(Approved);
