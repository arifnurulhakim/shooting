const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        idle_in_transaction_session_timeout: dbConfig.dialectOptions.idle_in_transaction_session_timeout
    },

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.player = require("./player.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.content = require("./content.model.js")(sequelize, Sequelize);

db.playertoken = require("./playertoken.model.js")(sequelize, Sequelize);
db.player.hasMany(db.playertoken);
db.playertoken.belongsTo(db.player);

db.play = require("./play.model.js")(sequelize, Sequelize);
db.player.hasMany(db.play);
db.play.belongsTo(db.player);

db.admintoken = require("./admintoken.model.js")(sequelize, Sequelize);
db.admin.hasMany(db.admintoken);
db.admintoken.belongsTo(db.admin);

module.exports = db;