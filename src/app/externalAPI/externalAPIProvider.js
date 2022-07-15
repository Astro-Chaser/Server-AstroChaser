const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {serviceKey} = require("../../../config/serviceKey");
const externalAPIDao = require("./externalAPIDao");

const {connect} = require("http2");

exports.getAstroInfo = async function(req, res){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const getAstroEventInfoRes = await externalAPIDao.getAstroInfo(connection, req);

        connection.release();

        return response(baseResponse.SUCCESS, getAstroEventInfoRes);
    }
    catch{
        return errResponse(baseResponse.EXTERNAL_API_CONNECTION_ERROR, "no");
    }
}