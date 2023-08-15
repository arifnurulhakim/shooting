const fs = require('fs');
const path = require('path');
module.exports = {
  HOST: "database-1.caaq62uigts9.ap-southeast-1.rds.amazonaws.com",
  USER: "postgres",
  PASSWORD: "rqIGlz5x2iFPArVBLXIx",
  DB: "postgres",
  dialect: "postgres",
  dialectOptions: {
    idle_in_transaction_session_timeout: 1000
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 1000
  }
};