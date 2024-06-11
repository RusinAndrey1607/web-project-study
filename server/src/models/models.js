const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db/db");

class User extends Model {}

User.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: "User" });

class Role extends Model {}

Role.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { sequelize, modelName: "Role" });

User.belongsTo(Role);

class Lot extends Model {}

Lot.init({
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }, 
    type: { 
        type: DataTypes.ENUM('type1', 'type2', 'type3', 'type4', 'type5'), 
        allowNull: false 
    }, 
    initialPrice: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    }, 
    auctionEndTime: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    auctionType: { 
        type: DataTypes.ENUM('increase', 'decrease'), 
        allowNull: false 
    } 
}, { 
    sequelize, 
    modelName: 'Lot' 
});

class Bid extends Model {}

Bid.init({
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    bidAmount: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    }
}, { 
    sequelize, 
    modelName: 'Bid' 
});

class TradeResult extends Model {}
TradeResult.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    lotId: { type: DataTypes.INTEGER, allowNull: false },
    winningBidId: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: "TradeResult" });

TradeResult.belongsTo(Bid, { as: 'winningBid' });
TradeResult.belongsTo(Lot, { as: 'lot' })

Bid.belongsTo(User);
Bid.belongsTo(Lot);

Lot.hasMany(Bid);
User.hasMany(Bid);

module.exports = { User, Role,Lot,Bid,TradeResult };