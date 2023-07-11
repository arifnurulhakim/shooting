module.exports = (sequelize, Sequelize) => {
    const Content = sequelize.define("content", {
        label: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        }
    });
    return Content;
};