import React from 'react';
import BidsList from './BidList';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Grid, Button } from '@mui/material';

const LotDetailsPage = () => {
  const { lotId } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Lot Details
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <BidsList lotId={lotId} />
      </Paper>
      <Button variant="contained" color="primary">
        Place Bid
      </Button>
    </div>
  );
};

export default LotDetailsPage;
