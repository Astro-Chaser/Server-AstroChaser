const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const userDao = require("./userDao");
const userProvider = require("./userProvider");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

exports.creteUser = async function (name, email, password, member, generation){

    const isEmailDuplicated = await userProvider.emailDuplicateCheck(email);
    try{
        if(isEmailDuplicated[0].userCount != 0){//이메일 중복이 있는 경우
            return errResponse(baseResponse.SIGNUP_EMAIL_DUPLICATED);
        }

         // 비밀번호 암호화
         const hashedPassword = await crypto
         .createHash("sha512")
         .update(password)
         .digest("hex");

         const insertUserParams = [name, email, hashedPassword, member, generation];

         const connection = await pool.getConnection(async (conn) => conn);
         const userCreateResult = await userDao.insertUserInfo(connection, insertUserParams);

         console.log('추가된 회원: ' + userCreateResult);
         connection.release();
         return response(baseResponse.SUCCESS);
    }
    catch{
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
    
}