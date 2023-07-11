const config = require("../config/auth.config");

const db = require("../models");
const Player = db.player;
const PlayerToken = db.playertoken;

var jwt = require("jsonwebtoken");
var randomstring = require("randomstring");

exports.playerLogin = (req, res) => {
    const wallet = req.body.wallet;
    const whereWallet = { where: { wallet: wallet } };
    console.log(wallet);
    // Find Player
    Player.findAll(whereWallet)
    .then(data => {
        console.log(data);
        if (data.length > 0) {
            const randToken	= randomstring.generate(32);	
            var token = jwt.sign({ id: data[0].id, randToken: randToken }, config.secret);	
            
            const playertoken = {
                playerId: data[0].id,
                token: randToken
            };
            PlayerToken.create(playertoken)
            .then(() => {
                res.send({status: "SUCCESS", data: {wallet: wallet, name: data[0].name, discord_link: data[0].discord_link, tw_link: data[0].tw_link, token: token}});
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });             

        } else {
            const player = {
                wallet: wallet
            };
    
            Player.create(player)
            .then(result => {
                const randToken	= randomstring.generate(32);	
                var token = jwt.sign({ id: result.id, randToken: randToken }, config.secret);                	
                
                const playertoken = {
                    playerId: result.id,
                    token: randToken
                };
                PlayerToken.create(playertoken)
                .then(() => {
                    res.send({status: "SUCCESS", data: {wallet: wallet, name: "", discord_link: "", tw_link: "", token: token}});
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                }); 
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });            
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Player."
        });
    }); 
};

// Update Player
exports.playerUpdate = (req, res) => {
    const playerId = req.playerId;
    const name = req.body.name;
    const discordLink = req.body.discord_link;
    const twLink = req.body.tw_link;

    // Player Data
    const player = {
        name: name,
        discord_link: discordLink,
        tw_link: twLink,
    };

    // Update to Database
    Player.update(player, {
        where: { id: playerId }
    })
    .then(result => {
        res.send({status: "SUCCESS", data: player})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while updating Player Data."
        });
    });
};