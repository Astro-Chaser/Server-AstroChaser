const guestbookProvider = require("./guestbookProvider");
const guestbookService = require("./guestbookService");

const response = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponseStatus = require("../../../config/baseResponseStatus");

/**
 * 1. 방명록 작성 API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.postGuestbook = async function (req, res){

    const {writer, content} = req.body;

    if(!writer)
        return res.send(response.response(baseResponse.GUESTBOOK_WRITER_EMPTY));
    if(!content)
        return res.send(baseResponse.response(baseResponse.GUESTBOOK_CONTENT_EMPTY));

    const postGuestbookResponse = await guestbookService.createGuestBook(
        writer,
        content
    )

    return res.send(postGuestbookResponse);
}


exports.getGuestbook = async function (req, res){
    
    const getGuestbookResponse = await guestbookProvider.getGuestbook();

    return res.send(getGuestbookResponse);
}