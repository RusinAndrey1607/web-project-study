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
  CardActions,
  Box,
} from "@mui/material";
import { addBid } from "../store/bid.slice";

const LotList = () => {
  const dispatch = useDispatch();
  const { items: lots, error, isLoading } = useSelector((state) => state.lots);
  const [bidAmount, setBidAmount] = useState({});

  const handleBidAmountChange = (lotId, amount) => {
    setBidAmount((prev) => ({ ...prev, [lotId]: amount }));
  };

  const handleSubmitBid = (lotId) => {
    if (bidAmount[lotId]) {
      dispatch(addBid({ lotId, bidAmount: bidAmount[lotId] }))
    }
  };
  useEffect(() => {
    if (!lots?.length) {
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
      <Typography variant="h4" gutterBottom>
        Lots
      </Typography>
      <List>
        {lots.map((lot) => (
          <ListItem key={lot.id} disableGutters>
            <Card variant="outlined" sx={{ width: "100%", mb: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {lot.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {lot.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Starting Price: {lot.startingPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Time: {lot.endTime}
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
