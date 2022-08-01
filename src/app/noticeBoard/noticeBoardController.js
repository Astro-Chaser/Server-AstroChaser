const noticeBoardProvider = require("./noticeBoardProvider");
const noticeBoardService = require("./noticeBoardService");

const response = require("../../../config/response");
const errResponse = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

exports.postNoticeBoard = async function(req, res){
    const token = req.verifiedToken;
    if(!token)
        return res.send(response.response(baseResponse.TOKEN_EMPTY))

    const {title, content} = req.body;

    if(!title) return res.send(errResponse(baseResponse.NOTICEBOARD_TITLE_EMPTY));
    if(!content) return res.send(errResponse(baseResponse.NOTICEBOARD_CONTENT_EMPTY));

    const postNoticeBoardRes = await noticeBoardService.postNoticeBoard(req, token);
    
    return res.send(postNoticeBoardRes);
}