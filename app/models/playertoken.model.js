module.exports = (sequelize, Sequelize) => {
    const PlayerToken = sequelize.define("playertoken", {
        token: {
            type: Sequelize.STRING
        }
    });
    return PlayerToken;
};