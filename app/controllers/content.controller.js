const { sequelize } = require('../models');
const db = require("../models");
const Content = db.content;
const QueryTypes = db.Sequelize.QueryTypes;

// Update Content
exports.contentUpdate = (req, res) => {
    const label = req.params.label;

    // Update Content
    const content = {
        title: req.body.title,
        content: req.body.content,
    };
    // Update Content to Database
    Content.update(content, {
        where: { label: label }
    })
    .then(result => {
        res.send({status: "SUCCESS", data: result})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while updating Content."
        });
    });
};

// List Content by Label
exports.contentList = (req, res) => {
    const label = req.params.label;

    const whereLabel = (label) ? { where: { label: label } }:{};

    // Find Content
    Content.findAll(whereLabel)
    .then(data => {
        if (data) {
            res.send({status: "SUCCESS", data: data});
        } else {
            res.status(404).send({
                message: `Cannot find Content with label ${label}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Content."
        });
    }); 
};

// List Content by Label
exports.contentList2 = async (req, res) => {
    const label = req.params.label;

    const whereLabel = (label) ? { where: { label: label } }:{};

    const foundContent = await Content.findAll(whereLabel);
    if (!foundContent) {
        return res.status(401).send({message: 'Content not found'});
    
    } else {
        res.send({status: "SUCCESS", data: foundContent});
    }
};