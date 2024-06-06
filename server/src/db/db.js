const {Sequelize} = require('sequelize')
require('dotenv').config()


const connectionString = process.env.DATABASE_URL || "postgresql://postgres:root@localhost:5432/web"


const sequelize = new Sequelize(connectionString)

const dbConnect = async () => {
    try {
        await sequelize.authenticate({logging:false})
        await sequelize.sync()
        console.log("Connect to database")
    } catch (error) {
        await sequelize.close()
        throw new Error(error)

    } 
}
module.exports = {
    dbConnect,
    sequelize
}