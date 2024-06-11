import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBids } from "../store/bid.slice";
import {
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const BidsList = ({ lotId }) => {
  const dispatch = useDispatch();
  const bids = useSelector((state) => state.bids.items);
  const isLoading = useSelector((state) => state.bids.isLoading);
  const error = useSelector((state) => state.bids.error);

  useEffect(() => {
    dispatch(fetchBids(lotId));
  }, [dispatch, lotId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(bids);
  if (bids.length === 0) {
    return <div>No bids available for this lot.</div>;
  }
  return (
    <List>
      {bids.map((bid) => (
        <Paper key={bid.id} elevation={3} style={{ marginBottom: "10px" }}>
          <ListItem>
            <ListItemText
              primary={`User: ${bid.User?.email}`}
              secondary={`Lot: ${bid.Lot?.name}`}
            />
            <ListItemText primary={`Amount: ${bid.bidAmount}`} />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default BidsList;
