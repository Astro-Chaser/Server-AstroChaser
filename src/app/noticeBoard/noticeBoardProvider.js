const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const noticeBoardDao = require("./noticeBoardDao");

const {connect} = require("http2");
const res = require("express/lib/response");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { post } = require("request");

exports.getNoticeTitle = async function(){
    try{
       
        const connect = await pool.getConnection(async (conn) => conn);
        const getNoticeTitleRes = await noticeBoardDao.getNoticeTitle(connect);

        return response(baseResponseStatus.SUCCESS, getNoticeTitleRes)
    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }

}