import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Auction System
        </Typography>
        {user.role === 'ADMIN' && (
          <Button color="inherit" component={Link} to="/create-lot">
            Create Lot
          </Button>
        )}
        <Button color="inherit" component={Link} to="/completedTrades">
          Completed Trades
        </Button>
        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/registration">
              Registration
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
