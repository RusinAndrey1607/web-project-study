const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api.error");
const { Lot } = require("../models/models");

class LotController {
    async createLot(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation Failed", errors.array()));
            }

            const { name, type, initialPrice, auctionEndTime, auctionType } = req.body;

            const lot = await Lot.create({
                name,
                type,
                initialPrice,
                auctionEndTime,
                auctionType
            });

            return res.status(201).json(lot);
        } catch (error) {
            next(error);
        }
    }

    async getLots(req, res, next) {
        try {
            const lots = await Lot.findAll();
            return res.json(lots);
        } catch (error) {
            next(error);
        }
    }

    async getLotById(req, res, next) {
        try {
            const { id } = req.params;
            const lot = await Lot.findByPk(id);

            if (!lot) {
                return next(ApiError.BadRequest("Lot not found"));
            }

            return res.json(lot);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new LotController();
