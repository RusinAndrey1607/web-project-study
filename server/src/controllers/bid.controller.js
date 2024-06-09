const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");
const { Bid, Lot,User } = require("../models/models");

class BidController {
  async createBid(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation Failed", errors.array()));
      }

      const { lotId, bidAmount } = req.body;
      const userId = req.user.id;
      const lot = await Lot.findByPk(lotId);
      if (!lot) {
        return next(ApiError.BadRequest("Lot not found"));
      }

      const bid = await Bid.create({
        UserId: userId,
        LotId:lotId,
        bidAmount,
      });

      return res.status(201).json(bid);
    } catch (error) {
      next(error);
    }
  }

  async getBids(req, res, next) {
    try {
      const bids = await Bid.findAll({
        include: [
          { model: Lot, attributes: ["name","id"] },
          { model: User, attributes: ["email", "id"] },
        ],
      });
      return res.json(bids);
    } catch (error) {
      next(error);
    }
  }

  async getBidsByLotId(req, res, next) {
    try {
      const { lotId } = req.params;
      const bids = await Bid.findAll({
        where: { LotId: lotId },
        include: [
          { model: User, attributes: ['email'] }, 
          { model: Lot, attributes: ['name'] }
        ]
      });
  
      if (bids.length === 0) {
        return res.json([]);
      }
  
      return res.json(bids);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BidController();
