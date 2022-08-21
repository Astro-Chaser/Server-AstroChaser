const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const noticeBoardDao = require("./noticeBoardDao");
const {imgDeleter} = require('./s3ImgUploader');

const {connect} = require("http2");
const res = require("express/lib/response");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { post } = require("request");

/**
 * 게시글 작성하기
 * @param {*} req 
 * @param {*} token 
 * @returns 
 */
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
        postNoticeBoardParams.type = req.body.type;

        const connect = await pool.getConnection(async (conn) => conn);
        const insertResult = await noticeBoardDao.postNoticeBoard(connect, postNoticeBoardParams);

        connect.release();
        
        return response(baseResponseStatus.SUCCESS, insertResult);
    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}

/**
 * 댓글 달기
 * @param {*} token 
 * @param {*} content 
 * @param {*} upperId 
 * @param {*} postId 
 * @returns 
 */
exports.postComment = async function(token, content, upperId, postId){
    try{
        let postCommentParams = new Object();

        postCommentParams.postId = postId
        postCommentParams.writerId = token.id;
        postCommentParams.content = content;
        postCommentParams.upperId = upperId;

        const connect = await pool.getConnection(async (conn) => conn);
        const postCommentResult = await noticeBoardDao.postComment(connect, postCommentParams);

        connect.release();

        if(postCommentResult[0].affectedRows == 1) return response(baseResponseStatus.SUCCESS);
        else return errResponse(baseResponseStatus.DB_ERROR);
    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}

exports.deleteNoticeBoard = async function(req, token){
    try{
        let deleteNoticeBoardParams = new Object();

        const connect = await pool.getConnection(async (conn) => conn);
        let preNoticeInfoRes = await noticeBoardDao.getNoticeBoardPictures(connect, req.body.noticeNum); 

        console.log(preNoticeInfoRes);

        //작성자 주인이거나 관리자면 삭제 가능
        if(preNoticeInfoRes.id == token.id || token.id == 1){  

            for(let i in preNoticeInfoRes)
            {
                console.log(preNoticeInfoRes[i].mediaUrl.substring(52));
            // imgDeleter(preNoticeInfoRes[0].mediaUrl.substring(52));
            }
            
            connect.release();
        }


        //게시자가 아니면 삭제 불가
        if(preNoticeInfoRes.id != token.id){
            connect.release();


        }

        connect.release();

    }
    catch{
        return errResponse(baseResponseStatus.DB_ERROR);
    }
}