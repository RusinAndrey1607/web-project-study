import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Typography, Paper, Grid, Button, TextField } from "@mui/material";
import BidsList from "./BidList";
import { addBid } from "../store/bid.slice";
import { closeTrade } from "../store/tradeResult.slice";

const LotDetailsPage = () => {
  const { lotId } = useParams();
  const dispatch = useDispatch();
  const [bidAmount, setBidAmount] = useState("");
  const userRole = useSelector((state) => state.auth.user.role);

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleSubmitBid = () => {
    if (bidAmount) {
      dispatch(addBid({ lotId, bidAmount }));
      setBidAmount("");
    }
  };
  const handleCloseTrade = () => {
    dispatch(closeTrade(lotId));
  };
  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item>
          <Button component={Link} to="/" variant="outlined" color="secondary">
            Back to All Lots
          </Button>
        </Grid>
        {userRole === "ADMIN" && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseTrade}
            >
              Close Trade
            </Button>
          </Grid>
        )}
      </Grid>
      <Typography variant="h3" gutterBottom>
        Lot Details
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Bid Amount"
            type="number"
            value={bidAmount}
            onChange={handleBidAmountChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitBid}
            fullWidth
          >
            Place Bid
          </Button>
        </Grid>
      </Grid>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <BidsList lotId={lotId} />
      </Paper>
    </div>
  );
};

export default LotDetailsPage;
