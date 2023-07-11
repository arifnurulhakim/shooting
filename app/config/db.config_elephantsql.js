module.exports = {
  HOST: "tiny.db.elephantsql.com",
  USER: "qzhyggqg",
  PASSWORD: "iQt9SlFhVcsPN5yJSqxdAS4wQHwHmaJ5",
  DB: "qzhyggqg",
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