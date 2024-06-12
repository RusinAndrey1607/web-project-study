import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLots } from "../store/lot.slice";
import {
  CircularProgress,
  Button,
  List,
  ListItem,
  TextField,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { addBid } from "../store/bid.slice";
import { Link } from "react-router-dom";

const LotList = () => {
  const dispatch = useDispatch();
  const { items: lots, error, isLoading } = useSelector((state) => state.lots);
  const [bidAmount, setBidAmount] = useState({});

  const handleBidAmountChange = (lotId, amount) => {
    setBidAmount((prev) => ({ ...prev, [lotId]: amount }));
  };

  const handleSubmitBid = (lotId) => {
    if (bidAmount[lotId]) {
      dispatch(addBid({ lotId, bidAmount: bidAmount[lotId] }));
    }
  };
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };
  useEffect(() => {
    if (lots == null) {
      dispatch(fetchLots());
    }
  }, [dispatch, lots]);
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lots
        </Typography>
      </Box>

      <List>
        {lots?.map((lot) => (
          <ListItem key={lot.id} disableGutters>
            <Card variant="outlined" sx={{ width: "100%", mb: 2 }}>
              <CardContent sx={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="h5" component={Link} to={`/lot/${lot.id}`}>
                  {lot.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {lot.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Starting Price: {lot.startingPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Time: {formatDateTime(lot.auctionEndTime)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <TextField
                    label="Bid Amount"
                    type="number"
                    value={bidAmount[lot.id] || ""}
                    onChange={(e) =>
                      handleBidAmountChange(lot.id, e.target.value)
                    }
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmitBid(lot.id)}
                  >
                    Submit Bid
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default LotList;
