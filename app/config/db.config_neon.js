module.exports = {
    HOST: "ep-lively-wave-006988.ap-southeast-1.aws.neon.tech",
    USER: "doddi.sudartha",
    PASSWORD: "n1aHgLJ6fYVc",
    DB: "arete",
    dialect: "postgres",
    dialectOptions: {
      idle_in_transaction_session_timeout: 1000,
      ssl: {
        require: true
      }
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 1000
    }
};