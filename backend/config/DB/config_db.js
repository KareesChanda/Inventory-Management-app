const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'production';
const config = require('../config_env')[env];
const Op = Sequelize.Op;

//Initializes db and uses config variables to populate verification fields
const db = new Sequelize(config.database.db_name, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: config.database.dialect,
    port: config.database.port,
    pool: config.database.pool,
    //limits Operator Alias use for security reasons
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
        $ne: Op.ne,
        $iLike: Op.iLike
    }
});

//Connects db, forces all models to sync to test databases
// db.sync({force: true, match: /_test$/})
db.sync({force: false})
    .then(() => {
        console.log("Database is successfuly connected");
    })
    .catch((err) => {
        console.log(err);
    });
module.exports = db;
