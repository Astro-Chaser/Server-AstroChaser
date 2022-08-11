const noticeBoardProvider = require("./noticeBoardProvider");
const noticeBoardService = require("./noticeBoardService");

const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponseStatus = require("../../../config/baseResponseStatus");


/**
 * 일반공지 게시글 작성 Controller
 */
exports.postNoticeBoard = async function(req, res){
    const token = req.verifiedToken;
    if(!token)
        return res.send(response.response(baseResponse.TOKEN_EMPTY))

    const {title, content, type} = req.body;

    if(!title) return res.send(errResponse(baseResponse.NOTICEBOARD_TITLE_EMPTY));
    if(!content) return res.send(errResponse(baseResponse.NOTICEBOARD_CONTENT_EMPTY));
    if(!type) return res.send(errResponse(baseResponse.NOTICEBOARD_TYPE_ERROR));

    const postNoticeBoardRes = await noticeBoardService.postNoticeBoard(req, token);
    
    return res.send(postNoticeBoardRes);
}

/**
 * 일반공지 게시글 타이블 가져오기
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getNoticeTitle = async function(req, res){
    const type = req.params.type;
    if(!type) return res.send(errResponse(baseResponse.NOTICEBOARD_TYPE_ERROR));
    const getNoticeTitleRes = await noticeBoardProvider.getNoticeTitle(req);

    return res.send(getNoticeTitleRes)
}

/**
 * 게시판 내용 가져오기
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getNoticeContent = async function(req, res){
    const noticeNum = req.params.num;
    const type = req.params.type;

    if(!noticeNum) return res.send(baseResponse.NOTICEBOARD_PAGE_EMPTY);
    if(!type) return res.send(errResponse(baseResponse.NOTICEBOARD_TYPE_ERROR));

    const getNoticeContentRes = await noticeBoardProvider.getNoticeContent(noticeNum, type);

    return res.send(getNoticeContentRes);
}

/**
 * 댓글 달기
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.postComment = async function(req, res){
    const token = req.verifiedToken;
    if(!token)
        return res.send(response.response(baseResponse.TOKEN_EMPTY));

    let {content, upperId, postId} = req.body;

    if(!upperId) upperId=0;
    if(!content) return res.send(errResponse(baseResponse.COMMENT_CONTENT_EMPTY));
    if(!postId) return res.send(errResponse(baseResponseStatus.COMMENT_POST_ID_EMPTY));

    const postCommentRes = await noticeBoardService.postComment(token, content, upperId, postId);

    return res.send(postCommentRes);
}

/**
 * 댓글 가져오기
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getComment = async function(req, res){
    const noticeNum = req.query.pageNum;
    
    if(!noticeNum) return res.send(baseResponse.NOTICEBOARD_PAGE_EMPTY);

    const getCommentRes = await noticeBoardProvider.getComment(noticeNum);

    return res.send(getCommentRes);
}