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
const { post } = require("request");

exports.postChasingHistory = async function(req){
    try{
        let postChasingHistoryParams = new Object();
        let s3Urls = new Array()
        for(var i in req.files)
        {
            s3Urls.push(req.files[i].location)
        }
        postChasingHistoryParams.title = req.query.title;
        postChasingHistoryParams.writerEmail = req.body.writer
        postChasingHistoryParams.pictureUrls = s3Urls;
        postChasingHistoryParams.content = req.body.content;

        const connect = await pool.getConnection(async (conn) => conn);
        const insertResult = await chasingHistoryDao.postChasingHistory(connect, postChasingHistoryParams);

        connect.release();
        
        return response(baseResponseStatus.SUCCESS, insertResult);
    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}
