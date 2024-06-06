const express = require('express');
const { body } = require('express-validator');
const LotController = require('../controllers/lot.contoller');
const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');

const router = express.Router();

router.post(
    '/',
    authMiddleware,
    checkRole('ADMIN'),
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('type').isIn(['type1', 'type2', 'type3', 'type4', 'type5']).withMessage('Invalid type'),
        body('initialPrice').isFloat({ min: 0 }).withMessage('Initial price must be a positive number'),
        body('auctionEndTime').isISO8601().withMessage('Invalid date format for auction end time'),
        body('auctionType').isIn(['increase', 'decrease']).withMessage('Invalid auction type')
    ],
    LotController.createLot
);

router.get('/', authMiddleware, LotController.getLots);
router.get('/:id', LotController.getLotById);

module.exports = router;
