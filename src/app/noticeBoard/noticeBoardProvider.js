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
        if(type=='normal' || type=='NORMAL')
        {
            const getNoticeTitleRes = await noticeBoardDao.getNormalNoticeTitle(connect);
            
            connect.release();
            return response(baseResponseStatus.SUCCESS, getNoticeTitleRes)
        }
        else if(type=='chasing' || type=='CHASING')
        {
            const getNoticeTitleRes = await noticeBoardDao.getChasingNormalTitle(connect);
            
            connect.release();
            return response(baseResponseStatus.SUCCESS, getNoticeTitleRes)
        }

    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}

/**
 * 게시글 내용 불러오기
 * @param {*} noticeNum 
 * @param {*} type 
 * @returns 
 */
exports.getNoticeContent = async function(noticeNum, type){
    try{
        const connect = await pool.getConnection(async (conn) => conn);
        const getNoticeContentRes = await noticeBoardDao.getNoticeContent(connect, noticeNum, type)

        if(getNoticeContentRes.length==0) return errResponse(baseResponseStatus.NOTICEBOARD_TYPE_ERROR);

        connect.release();
        return response(baseResponseStatus.SUCCESS, getNoticeContentRes);
    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}

/**
 * 게시글 댓글 불러오기
 * @param {*} noticePage 
 * @returns 
 */
exports.getComment = async function(noticePage){
    try{
        const connect = await pool.getConnection(async (conn) => conn);
        const getCommentRes = await noticeBoardDao.getComment(connect, noticePage);

        connect.release();

        return response(baseResponseStatus.SUCCESS, getCommentRes)
    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}