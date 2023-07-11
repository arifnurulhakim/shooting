module.exports = (sequelize, Sequelize) => {
    const AdminToken = sequelize.define("admintoken", {
        token: {
            type: Sequelize.STRING
        }
    });
    return AdminToken;
};