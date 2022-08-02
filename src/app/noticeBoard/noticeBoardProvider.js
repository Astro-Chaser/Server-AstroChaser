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

/**
 * 일반 게시글 타이틀 가져오기
 * @returns 
 */
exports.getNoticeTitle = async function(req){
    try{
        const type = req.params.type;
        const connect = await pool.getConnection(async (conn) => conn);
        const getNoticeTitleRes = await noticeBoardDao.getNoticeTitle(connect, type);

        return response(baseResponseStatus.SUCCESS, getNoticeTitleRes)
    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}

exports.getNoticeContent = async function(noticeNum, type){
    try{
        const connect = await pool.getConnection(async (conn) => conn);
        const getNoticeContentRes = await noticeBoardDao.getNoticeContent(connect, noticeNum, type)

        if(getNoticeContentRes.length==0) return errResponse(baseResponseStatus.NOTICEBOARD_TYPE_ERROR);
        
        return response(baseResponseStatus.SUCCESS, getNoticeContentRes);
    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}