const express = require("express");
const router = express.Router();
const tradeController = require("../controllers/trade.contoller");

router.post("/end", async (req, res, next) => {
  try {
    const { lotId } = req.body;
    const result = await tradeController.endTrading(lotId);    
    if (result.success) {
      return res.status(200).json(result.tradeResult);
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    next(error);
  }
});
router.get("/",async(req,res,next) =>{
  try {
    const result = await tradeController.getCompletedTrades();    
    if (result.success) {
      return res.status(200).json(result.completedTrades);
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    next(error);
  }
})
module.exports = router;