module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
        wallet: {
            type: Sequelize.STRING,
            unique: true
        },
        name: {
            type: Sequelize.STRING
        },
        discord_link: {
            type: Sequelize.STRING
        },
        tw_link: {
            type: Sequelize.STRING
        }
    });
    return Player;
};