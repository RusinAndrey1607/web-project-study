const { Bid, TradeResult, Lot } = require("../models/models");

class TradeController {
  async endTrading(lotId) {
    try {
      const existingResult = await TradeResult.findOne({ where: { lotId } });
      if (existingResult) {
        return {
          success: false,
          error: "Trading for this lot has already ended",
        };
      }
      const winningBid = await Bid.findOne({
        where: { LotId: lotId },
        order: [["bidAmount", "DESC"]],
      });

      const tradeResult = await TradeResult.create({
        lotId,
        winningBidId: winningBid.id,
      });

      return { success: true, tradeResult };
    } catch (error) {
      console.error("Error ending trading:", error);
      return { success: false, error: error.message };
    }
  }
  async getCompletedTrades() {
    try {
      const completedTrades = await TradeResult.findAll({
        include: {
          all: true,
        },
      });
      return { success: true, completedTrades };
    } catch (error) {
      console.error("Error fetching completed trades:", error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new TradeController();
