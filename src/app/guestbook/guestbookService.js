const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const guestbookDao = require("./guestbookDao");
const guestbookProvider = require("./guestbookProvider");

const {connect} = require("http2");
const res = require("express/lib/response");

/**
 * 1. 방명록 작성 API
 * @param {*} writer 
 * @param {*} content 
 * @returns 
 */
exports.createGuestBook = async function (writer, content){
    try{
       
        const createGuestBookParams = [writer, content];
        const connection = await pool.getConnection(async (conn) => conn);
        const createGuestBookResult = await guestbookDao.createGuestBook(connection, createGuestBookParams)

        connection.release();
        console.log(createGuestBookResult);
        return response(baseResponse.SUCCESS, {'writer' : writer,
                                                'content' : content});
    }
    catch{
        //logger.error(`App - signIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}