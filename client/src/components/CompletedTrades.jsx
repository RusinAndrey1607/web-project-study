import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTradeResults } from "../store/tradeResult.slice";
import {
  CircularProgress,
  List,
  ListItem,
  Typography,
  Divider,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const CompletedTradesPage = () => {
  const dispatch = useDispatch();
  const tradeResults = useSelector((state) => state.tradeResults.items);
  const isLoading = useSelector((state) => state.tradeResults.isLoading);
  const error = useSelector((state) => state.tradeResults.error);

  useEffect(() => {
    dispatch(fetchTradeResults());
  }, [dispatch]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div  style={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Completed Trades
        </Typography>
        <Grid item>
          <Button component={Link} to="/" variant="outlined" color="secondary">
            Back to All Lots
          </Button>
        </Grid>
      </Box>

      <List>
        {tradeResults.map((tradeResult, index) => (
          <React.Fragment key={tradeResult.id}>
            <ListItem>
              <Typography variant="h6">
                Lot Name: {tradeResult.lot.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Lot ID: {tradeResult.lotId}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Winning Bid ID: {tradeResult.winningBidId}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Winning Bid Amount: {tradeResult.winningBid.bidAmount}
              </Typography>
            </ListItem>
            {index < tradeResults.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default CompletedTradesPage;
