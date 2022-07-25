const userService = require("./userService");
const userProvider = require("./userProvider");

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

/**
 * 2. 로그인 API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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

/**
 * 유저 JWT 검증
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.checkToken = async function (req, res){
    const token = req.verifiedToken;

    const email = token.userEmail;
    const exp = token.exp;
    const iat = token.iat;

    if(!token)
        return res.send(response.response(baseResponse.TOKEN_EMPTY))
    
    const checkTokenkResponse = await userProvider.checkToken(email, exp, iat);

    return res.send(checkTokenkResponse)
}

exports.updateToken = async function (req, res){
    const {refreshToken, email} = req.body;

    if(!refreshToken)
        return res.send(response.response(baseResponse.TOKEN_EMPTY))
    if(!email)
        return res.send(response.response(baseResponse.SIGNIN_EMAIL_EMPTY))


    const checkRefreshTokenResponse = await userService.updateToken(refreshToken, email);

    return res.send(checkRefreshTokenResponse);    
}