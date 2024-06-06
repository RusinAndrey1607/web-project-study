const express = require('express');
const { body } = require('express-validator');
const BidController = require('../controllers/bid.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
    '/',
    authMiddleware,
    [
        body('lotId').notEmpty().withMessage('Lot ID is required'),
        body('bidAmount').isFloat({ min: 0 }).withMessage('Bid amount must be a positive number'),
    ],
    BidController.createBid
);
router.get('/', BidController.getBids);
router.get('/:lotId', BidController.getBidsByLotId);

module.exports = router;
