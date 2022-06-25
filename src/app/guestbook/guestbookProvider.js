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


exports.getGuestbook = async function (){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const getGuestbookResult = await guestbookDao.getGuestbook(connection);

        connection.release();

        return response(baseResponse.SUCCESS, getGuestbookResult);
    }
    catch{
        //logger.error(`App - signIn Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}