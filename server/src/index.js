const cors = require('cors')
const {dbConnect, sequelize} = require('./db/db')
const express = require('express')
const cookieParser = require('cookie-parser');

const authRouter = require('./routers/auth.router')
const lotRouter = require('./routers/lots.router')
const bidRouter = require('./routers/bid.router')
const tradeRouter = require('./routers/trade.router')
const errorMiddleware = require('./middlewares/error.middleware');
const authMiddleware = require('./middlewares/auth.middleware');
require('dotenv').config()



const port = process.env.PORT || 8000
const app = express()

app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use("/auth", authRouter)
app.use('/lot', authMiddleware, lotRouter);
app.use('/bid',authMiddleware, bidRouter);
app.use('/trade', tradeRouter);

app.use(errorMiddleware)

const start = async () => {
    try {

        await dbConnect()
        app.listen(port, () => {
            console.log("Server working on a port", port)

        })
    } catch (error) {

        console.log(error);

    }
}

start()