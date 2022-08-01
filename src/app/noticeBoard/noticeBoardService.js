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

exports.postNoticeBoard = async function(req, token){
    try{
        let postNoticeBoardParams = new Object();
        let s3Urls = new Array()
        for(var i in req.files)
        {
            s3Urls.push(req.files[i].location)
        }
        postNoticeBoardParams.title = req.body.title;
        postNoticeBoardParams.content = req.body.content;
        postNoticeBoardParams.folderName = req.body.folder;
        postNoticeBoardParams.writerid = token.id;
        postNoticeBoardParams.pictureUrls = s3Urls;

        const connect = await pool.getConnection(async (conn) => conn);
        const insertResult = await noticeBoardDao.postNoticeBoard(connect, postNoticeBoardParams);

        connect.release();
        
        return response(baseResponseStatus.SUCCESS, insertResult);

    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}