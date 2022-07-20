const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const chasingHistoryDao = require("./chasingHistoryDao");

const {connect} = require("http2");
const res = require("express/lib/response");
const baseResponseStatus = require("../../../config/baseResponseStatus");

exports.getChasingHistory = async function(){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const getChasingHistoryRes = await chasingHistoryDao.getChasingHistory(connection);

        connection.release();

        return response(baseResponse.SUCCESS, getChasingHistoryRes);
    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}

exports.getChasingHistoryContent = async function(req){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const getChasingHistoryContent = await chasingHistoryDao.getChasingHistoryContent(connection, req.params.pageNum);

        connection.release();

        return response(baseResponse.SUCCESS, getChasingHistoryContent);
    }
    catch{
        logger.error(`App - signIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
