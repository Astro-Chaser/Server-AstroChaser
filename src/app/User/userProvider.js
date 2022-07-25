const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
var jwtDecode = require('jwt-decode');
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const userDao = require("./userDao");
const userProvider = require("./userProvider");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const res = require("express/lib/response");

exports.emailDuplicateCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
}

exports.checkToken = async function(email, exp, iat){
  try{
    
    // const connection = await pool.getConnection(async (conn) => conn);
    // const checkTokenResult = await userDao.checkToken(connection, email);
    // connection.release();

    let checkTokenResult = new Object;

    checkTokenResult.result = "available";
    checkTokenResult.exp = exp;

    return response(baseResponse.SUCCESS, checkTokenResult);

  }
  catch{
    return errResponse(baseResponse.DB_ERROR)
  }
}