const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const db = require("../models");
const AdminToken = db.admintoken;
const Admin = db.admin;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, async(err, decoded) => {        
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        const foundAdmin = await AdminToken.findOne({ include: Admin, where: { token: decoded.randToken } });
        if (!foundAdmin) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        
        req.adminId = decoded.id;
        req.adminUser = foundAdmin.admin.username;
        //console.log(foundAdmin);
        next();
    });
};

const authAdmin = {
    verifyToken: verifyToken
};
module.exports = authAdmin;