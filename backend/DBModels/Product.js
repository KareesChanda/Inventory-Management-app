'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
        },
        name: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        amount: Sequelize.INTEGER
    },
    options: {
        freezeTableName: true,
    }
};