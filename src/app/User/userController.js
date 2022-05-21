
const response = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
/**
 * 1. 회원가입 API
 * @param {json} req 
 * @param {json} res 
 */
exports.postUsers = async function (req, res) {
    const {name, email, password, member, generation} = req.body;

    if(!name)
        return res.send(response.response(baseResponse.SIGNUP_NAME_EMPTY));
    else if(!email)
        return res.send(response.response(baseResponse.SIGNUP_EMAIL_EMPTY));
    else if(!password)
        return res.send(response.response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    
}