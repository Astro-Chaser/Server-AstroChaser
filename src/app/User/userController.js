const userService = require("./userService");

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
    if(!email)
        return res.send(response.response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if(!password)
        return res.send(response.response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    
    const signupUserResponse = await userService.creteUser(
        name,
        email,
        password,
        member,
        generation
    )

    return res.send(signupUserResponse);
}

exports.signinUser = async function (req, res){
    const {email, password} = req.body;

    if(!email)
        return res.send(response.response(baseResponse.SIGNIN_EMAIL_EMPTY))
    if(!password)
        return res.send(response.response(baseResponse.SIGNIN_PASSWORD_EMPTY))

    const signinUserResponse = await userService.signinUser(
        email,
        password
    ) 

    return res.send(signinUserResponse);

}