const chasingHistoryProvider = require("./chasingHistoryProvider");
const chasingHistoryService = require("./chasingHistoryService");

const response = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponseStatus = require("../../../config/baseResponseStatus");


exports.getChasingHistoryTitle = async function(req, res){
    const getChasingHistoryRes = await chasingHistoryProvider.getChasingHistory();

    return res.send(getChasingHistoryRes);
}

exports.postChasingHistory = async function(req, res){
    const postChasingHistory = await chasingHistoryService.postChasingHistory(req)

    return res.send(postChasingHistory);
}

exports.getChasingHistoryContent = async function(req, res){
    const getChasingHistoryContentRes = await chasingHistoryProvider.getChasingHistoryContent(req);

    return res.send(getChasingHistoryContentRes);
}

exports.postComment = async function(req, res){
    const token = req.verifiedToken;
    if(!token)
        return res.send(response.response(baseResponse.TOKEN_EMPTY));

    let {content, upperId, postId} = req.body;

    if(!upperId) upperId=0;
    if(!content) return res.send(errResponse(baseResponse.COMMENT_CONTENT_EMPTY));
    if(!postId) return res.send(errResponse(baseResponseStatus.COMMENT_POST_ID_EMPTY));

    const postCommentRes = await chasingHistoryService.postComment(token, content, upperId, postId);

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

    const getCommentRes = await chasingHistoryProvider.getComment(noticeNum);

    return res.send(getCommentRes);
}