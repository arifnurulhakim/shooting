const Moralis = require("moralis").default;
const { format } = require('date-fns');
const { sequelize } = require('../models');
const db = require("../models");
const Play = db.play;
const QueryTypes = db.Sequelize.QueryTypes;

// End Game
exports.playEnd = (req, res) => {
    // Create Item
    const play = {
        playerId: req.playerId,
        reward: req.body.reward,
        play_time: format(new Date(), 'yyyy-MM-dd HH:mm:ssx'),
    };
    // Save Play Session in the database
    Play.create(play)
    .then(result => {
        res.send({status: "SUCCESS", data: result})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Play Session."
        });
    });
};

// Player List
exports.playerList = async(req, res) => {
    const draw = (req.query.draw) ? parseInt(req.query.draw):0;
    const start = (req.query.start) ? req.query.start:0;
    const length = (req.query.length && req.query.length > 0) ? req.query.length:10;
    const colIndex = (req.query.order && req.query.order[0]['column']) ? req.query.order[0]['column']:0;
    const colDir = (req.query.order && req.query.order[0]['dir']) ? req.query.order[0]['dir']:"";
    const colName = (req.query.columns && req.query.columns[colIndex]['data']) ? req.query.columns[colIndex]['data']:"";
    const orderBy = (colName) ? colName +" "+ colDir:`last_play DESC`;

    const foundPlayer = await sequelize.query(
        `SELECT COALESCE(play.total_play, 0) AS total_play, COALESCE(play.last_play, '2022-01-01 00:00:00.000 +0700') AS last_play, COALESCE(play.last_play_string, '-') AS last_play_string, player.id, player.name, player.wallet
        FROM (
            SELECT COUNT(id) AS total_play, MAX(play_time) AS last_play, TO_CHAR(MAX(play_time), 'DD Mon YYYY, HH24:MI:SS') AS last_play_string, "playerId" FROM plays 
            GROUP BY "playerId"
        ) AS play
        RIGHT JOIN players AS player ON player.id = play."playerId"
        ORDER BY `+ orderBy +`
		LIMIT `+ length +` OFFSET `+ start, 
        { type: QueryTypes.SELECT }
    );
    const allPlayer = await sequelize.query(
        //`SELECT COUNT(id) AS player_total, "playerId" FROM plays GROUP BY "playerId"`, 
        `SELECT COUNT(id) AS player_total FROM players`, 
        { type: QueryTypes.SELECT }
    );
    if (foundPlayer) {
        res.send({status: "SUCCESS", draw: draw, iTotalDisplayRecords: foundPlayer.length, iTotalRecords: allPlayer[0]['player_total'], data: foundPlayer});

    } else {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Player List."
        });
    }
};

// Play List
exports.playList = async(req, res) => {
    const draw = (req.query.draw) ? parseInt(req.query.draw):0;
    const idUser = (req.query.id_user) ? req.query.id_user:"";
    const start = (req.query.start) ? req.query.start:0;
    const length = (req.query.length && req.query.length > 0) ? req.query.length:10;
    const colIndex = (req.query.order && req.query.order[0]['column']) ? req.query.order[0]['column']:0;
    var colDir = (req.query.order && req.query.order[0]['dir']) ? req.query.order[0]['dir']:"";
    var colDir = (req.query.sort_dir) ? req.query.sort_dir:colDir;
    var colName = (req.query.columns && req.query.columns[colIndex]['data']) ? req.query.columns[colIndex]['data']:"";
    var colName = (req.query.sort_by) ? req.query.sort_by:colName;
    const orderBy = (colName) ? colName +" "+ colDir:`play.play_time DESC`;

    /* MORALIS & NFT */
    var MORALIS_APIKEY      = "h3SHinI8snPsScr4PFUNmi2FUhgzAc2LqlYwCCL1wlJ55cZ0p7uWo4WAdrF0fbgn";
    var NFT_TOKEN_ADDRESS   = "0x433ffa9b550f53de2031f1d62c0aeaf7639cf982";
    var NFT_CHAIN           = "0x5";

    var wherePlayerId = (idUser != '') ? ` WHERE play."playerId" = '`+idUser+`'`:``;
    const foundPlay = await sequelize.query(
        `SELECT player.id, player.wallet, player.name, player.tw_link, player.discord_link, play.play_time
        FROM (
            SELECT MAX(play.play_time) AS play_time, play."playerId" FROM plays AS play GROUP BY play."playerId"
        ) play
        LEFT JOIN players AS player ON player.id = play."playerId"
        `+wherePlayerId+`
        ORDER BY `+ orderBy +`
		LIMIT `+ length +` OFFSET `+ start, 
        { type: QueryTypes.SELECT }
    );
    const allPlay = await sequelize.query(
        //`SELECT COUNT(id) AS play_total FROM plays`, 
        `SELECT COUNT(DISTINCT(play."playerId")) AS play_total FROM plays AS play `+wherePlayerId, 
        { type: QueryTypes.SELECT }
    );
    if (foundPlay) {
        var listPlayerId = '';
        for (i = 0; i < foundPlay.length; i++) {
            listPlayerId += (listPlayerId != '') ? ', ':'';
            listPlayerId += foundPlay[i]['id'];
        }

        const foundReward = await sequelize.query(
            `SELECT play.reward, play."playerId" FROM plays AS play
            WHERE play."playerId" IN (`+ listPlayerId +`)
            ORDER BY play."playerId"`, 
            { type: QueryTypes.SELECT }
        );  
        
        await Moralis.start({
            apiKey: MORALIS_APIKEY
        });
        
        for (i = 0; i < foundPlay.length; i++) {
            var tempReward = new Array();
            for (j = 0; j < foundReward.length; j++) {
                if (foundPlay[i]['id'] == foundReward[j]['playerId']) {
                    tempReward.push({'image': foundReward[j]['reward'] + '.png'});
                }
            }
            foundPlay[i]['reward']  = tempReward;
            //foundPlay[j]['reward']  = [{ 'image':'123456789.png'}, { 'image':'123456789.png'}, { 'image':'123456789.png'}, { 'image':'123456789.png'}, { 'image':'123456789.png'}];
            
            try {
                
              
                const response = await Moralis.EvmApi.nft.getWalletNFTs({
                  "chain": NFT_CHAIN,
                  "format": "decimal",
                  "tokenAddresses": [
                    NFT_TOKEN_ADDRESS
                  ],
                  "mediaItems": false,
                  "address": foundPlay[i]['wallet']
                });
              
                //console.log(response.raw);
                foundPlay[i]['nft'] = response.raw;
            } catch (e) {
                console.error(e);
                foundPlay[i]['nft'] = new Array();
            }
        }

        //for (i = 0; i < foundPlay.length; i++) {
            //foundPlay[i]['reward']  = tempReward[i];
        //}
        res.send({status: "SUCCESS", draw: draw, iTotalDisplayRecords: foundPlay.length, iTotalRecords: allPlay[0]['play_total'], data: foundPlay});

    } else {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Play List."
        });
    }
};

// Play List
exports.playList_BAK3 = async(req, res) => {
    const draw = (req.query.draw) ? parseInt(req.query.draw):0;
    const idUser = (req.query.id_user) ? req.query.id_user:"";
    const start = (req.query.start) ? req.query.start:0;
    const length = (req.query.length && req.query.length > 0) ? req.query.length:10;
    const colIndex = (req.query.order && req.query.order[0]['column']) ? req.query.order[0]['column']:0;
    var colDir = (req.query.order && req.query.order[0]['dir']) ? req.query.order[0]['dir']:"";
    var colDir = (req.query.sort_dir) ? req.query.sort_dir:colDir;
    var colName = (req.query.columns && req.query.columns[colIndex]['data']) ? req.query.columns[colIndex]['data']:"";
    var colName = (req.query.sort_by) ? req.query.sort_by:colName;
    const orderBy = (colName) ? colName +" "+ colDir:`play.play_time DESC`;

    var wherePlayerId = (idUser != '') ? ` WHERE play."playerId" = '`+idUser+`'`:``;
    const foundPlay = await sequelize.query(
        `SELECT player.id, player.wallet, player.name, player.tw_link, player.discord_link, play.play_time
        FROM (
            SELECT MAX(play.play_time) AS play_time, play."playerId" FROM plays AS play GROUP BY play."playerId"
        ) play
        LEFT JOIN players AS player ON player.id = play."playerId"
        `+wherePlayerId+`
        ORDER BY `+ orderBy +`
		LIMIT `+ length +` OFFSET `+ start, 
        { type: QueryTypes.SELECT }
    );
    const allPlay = await sequelize.query(
        //`SELECT COUNT(id) AS play_total FROM plays`, 
        `SELECT COUNT(DISTINCT(play."playerId")) AS play_total FROM plays AS play `+wherePlayerId, 
        { type: QueryTypes.SELECT }
    );
    if (foundPlay) {
        var listPlayerId = '';
        for (i = 0; i < foundPlay.length; i++) {
            listPlayerId += (listPlayerId != '') ? ', ':'';
            listPlayerId += foundPlay[i]['id'];
        }

        const foundReward = await sequelize.query(
            `SELECT play.reward, play."playerId" FROM plays AS play
            WHERE play."playerId" IN (`+ listPlayerId +`)
            ORDER BY play."playerId"`, 
            { type: QueryTypes.SELECT }
        );   
        
        for (i = 0; i < foundPlay.length; i++) {
            var tempReward = new Array();
            for (j = 0; j < foundReward.length; j++) {
                if (foundPlay[i]['id'] == foundReward[j]['playerId']) {
                    tempReward.push({'image': foundReward[j]['reward'] + '.png'});
                }
            }
            foundPlay[i]['reward']  = tempReward;
            //foundPlay[j]['reward']  = [{ 'image':'123456789.png'}, { 'image':'123456789.png'}, { 'image':'123456789.png'}, { 'image':'123456789.png'}, { 'image':'123456789.png'}];
        }

        for (i = 0; i < foundPlay.length; i++) {
            //foundPlay[i]['reward']  = tempReward[i];
        }
        res.send({status: "SUCCESS", draw: draw, iTotalDisplayRecords: foundPlay.length, iTotalRecords: allPlay[0]['play_total'], data: foundPlay});

    } else {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Play List."
        });
    }
};

// Play List
exports.playList_BAK2 = async(req, res) => {
    const draw = (req.query.draw) ? parseInt(req.query.draw):0;
    const start = (req.query.start) ? req.query.start:0;
    const length = (req.query.length && req.query.length > 0) ? req.query.length:10;
    const colIndex = (req.query.order && req.query.order[0]['column']) ? req.query.order[0]['column']:0;
    const colDir = (req.query.order && req.query.order[0]['dir']) ? req.query.order[0]['dir']:"";
    const colName = (req.query.columns && req.query.columns[colIndex]['data']) ? req.query.columns[colIndex]['data']:"";
    const orderBy = (colName) ? colName +" "+ colDir:`play.play_time DESC`;

    const foundPlay = await sequelize.query(
        `SELECT player.id, player.wallet, player.name, player.tw_link, player.discord_link, play.play_time
        FROM (
            SELECT MAX(play.play_time) AS play_time, play."playerId" FROM plays AS play GROUP BY play."playerId"
        ) play
        LEFT JOIN players AS player ON player.id = play."playerId"
        ORDER BY `+ orderBy +`
		LIMIT `+ length +` OFFSET `+ start, 
        { type: QueryTypes.SELECT }
    );
    const allPlay = await sequelize.query(
        //`SELECT COUNT(id) AS play_total FROM plays`, 
        `SELECT COUNT(DISTINCT(plays."playerId")) AS play_total FROM plays`, 
        { type: QueryTypes.SELECT }
    );
    if (foundPlay) {
        var wherePlayerId = '';
        for (i = 0; i < foundPlay.length; i++) {
            wherePlayerId += (wherePlayerId != '') ? ', ':'';
            wherePlayerId += foundPlay[i]['id'];
        }

        const foundReward = await sequelize.query(
            `SELECT play.reward, play."playerId" FROM plays AS play
            WHERE play."playerId" IN (`+ wherePlayerId +`)
            ORDER BY play."playerId"`, 
            { type: QueryTypes.SELECT }
        );   
        
        for (i = 0; i < foundPlay.length; i++) {
            var tempReward = new Array();
            for (j = 0; j < foundReward.length; j++) {
                if (foundPlay[i]['id'] == foundReward[j]['playerId']) {
                    tempReward.push({'image': foundReward[j]['reward'] + '.png'});
                }
            }
            foundPlay[i]['reward']  = tempReward;
            //foundPlay[j]['reward']  = [{ 'image':'123456789.png'}, { 'image':'123456789.png'}, { 'image':'123456789.png'}, { 'image':'123456789.png'}, { 'image':'123456789.png'}];
        }

        for (i = 0; i < foundPlay.length; i++) {
            //foundPlay[i]['reward']  = tempReward[i];
        }
        res.send({status: "SUCCESS", draw: draw, iTotalDisplayRecords: foundPlay.length, iTotalRecords: allPlay[0]['play_total'], data: foundPlay});

    } else {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Play List."
        });
    }
};

// Play List
exports.playList_BAK1 = async(req, res) => {
    const draw = (req.query.draw) ? parseInt(req.query.draw):0;
    const start = (req.query.start) ? req.query.start:0;
    const length = (req.query.length && req.query.length > 0) ? req.query.length:10;
    const colIndex = (req.query.order && req.query.order[0]['column']) ? req.query.order[0]['column']:0;
    const colDir = (req.query.order && req.query.order[0]['dir']) ? req.query.order[0]['dir']:"";
    const colName = (req.query.columns && req.query.columns[colIndex]['data']) ? req.query.columns[colIndex]['data']:"";
    const orderBy = (colName) ? colName +" "+ colDir:`play.play_time DESC`;

    const foundPlay = await sequelize.query(
        `SELECT player.id, player.wallet, player.name, player.tw_link, player.discord_link, play.reward, play.play_time
        FROM plays AS play
        LEFT JOIN players AS player ON player.id = play."playerId"
        ORDER BY `+ orderBy +`
		LIMIT `+ length +` OFFSET `+ start, 
        { type: QueryTypes.SELECT }
    );
    const allPlay = await sequelize.query(
        `SELECT COUNT(id) AS play_total FROM plays`, 
        { type: QueryTypes.SELECT }
    );
    if (foundPlay) {
        res.send({status: "SUCCESS", draw: draw, iTotalDisplayRecords: foundPlay.length, iTotalRecords: allPlay[0]['play_total'], data: foundPlay});

    } else {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Play List."
        });
    }
};