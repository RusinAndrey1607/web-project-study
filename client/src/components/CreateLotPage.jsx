import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Paper, Grid, MenuItem } from '@mui/material';
import { addLot } from '../store/lot.slice';
import { useNavigate  } from 'react-router-dom';

const CreateLotPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const [lotDetails, setLotDetails] = useState({
    name: '',
    type: '',
    initialPrice: '',
    auctionEndTime: '',
    auctionType: 'increase',
  });
  const [error, setError] = useState('');
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLotDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, type, initialPrice, auctionEndTime, auctionType } = lotDetails;
    if (name && type && initialPrice && auctionEndTime && auctionType) {
      dispatch(addLot(lotDetails));
      navigate('/');
    } else {
      setError('Please fill in all fields.');
    }
  };

  if (user.role !== 'ADMIN') {
    return <Typography variant="h6" color="error">You do not have permission to access this page.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Lot
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={lotDetails.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Type"
              name="type"
              select
              value={lotDetails.type}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="type1">Type 1</MenuItem>
              <MenuItem value="type2">Type 2</MenuItem>
              <MenuItem value="type3">Type 3</MenuItem>
              <MenuItem value="type4">Type 4</MenuItem>
              <MenuItem value="type5">Type 5</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Starting Price"
              name="initialPrice"
              type="number"
              value={lotDetails.initialPrice}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="End Time"
              name="auctionEndTime"
              type="datetime-local"
              value={lotDetails.auctionEndTime}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Auction Type"
              name="auctionType"
              select
              value={lotDetails.auctionType}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="increase">Increase</MenuItem>
              <MenuItem value="decrease">Decrease</MenuItem>
            </TextField>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create Lot
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateLotPage;
