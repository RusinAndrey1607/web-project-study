const {Bid,TradeResult} = require("../models/models");

class TradeController {
  async endTrading(lotId) {
    try {
      const winningBid = await Bid.findOne({
        where: { LotId:lotId },
        order: [["bidAmount", "DESC"]] 
      });

      const tradeResult = await TradeResult.create({
        lotId,
        winningBidId: winningBid.id
      });

      return { success: true, tradeResult };
    } catch (error) {
      console.error("Error ending trading:", error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new TradeController();
