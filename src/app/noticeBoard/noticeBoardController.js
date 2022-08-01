const noticeBoardProvider = require("./noticeBoardProvider");
const noticeBoardService = require("./noticeBoardService");

const response = require("../../../config/response");
const errResponse = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

exports.postNoticeBoard = async function(req, res){
    const {title, content, writer} = req.body;

    if(!writer) return res.send(errResponse(baseResponse.NOTICEBOARD_WRITER_EMPTY));
    if(!title) return res.send(errResponse(baseResponse.NOTICEBOARD_TITLE_EMPTY));
    if(!content) return res.send(errResponse(baseResponse.NOTICEBOARD_CONTENT_EMPTY));

    const postNoticeBoardRes = await noticeBoardService.postNoticeBoard(req);
    
    return res.send(postNoticeBoardRes);
}