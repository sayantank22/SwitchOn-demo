import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';
import Badge from '@material-ui/core/Badge';

export default function LongMenu({
  history,
  notificationCount,
  setNotificationCount,
}) {
  const [requests, setRequests] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    setNotificationCount(0);
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
          .filter((req) => req.notifications !== undefined)
          .slice(0, 9);
        setRequests([...filteredRequests]);
      })
      .catch((error) => {
        console.log(error);
        // setError('Invalid email or password');
      });
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userCred } = userLogin;

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
            .filter((req) => req.notifications !== undefined)
            .slice(0, 9);
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
    <div>
      <Tooltip placement='top' title='Notifications'>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleClick}>
          <Badge badgeContent={notificationCount} color='secondary'>
            <NotificationsIcon style={{ color: '#fff' }} />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {requests.map((req) => (
          <MenuItem
            key={req._id}
            selected={req.notifications === 'Pyxis'}
            onClick={handleClose}>
            <ChatIcon style={{ marginRight: '5px' }} />
            {req.notifications}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
