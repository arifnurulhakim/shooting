module.exports = (sequelize, Sequelize) => {
    const Play = sequelize.define("play", {
        reward: {
            type: Sequelize.STRING
        },
        play_time: {
            type: Sequelize.DATE
        }
    });
    return Play;
};