const externalAPIService = require("./externalAPIService");

const response = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponseStatus = require("../../../config/baseResponseStatus");

exports.getAstroInfo = async function (req, res){
    const getAstroInfoRes = await externalAPIService.getAstroInfo(req.params)

    return res.send(getAstroInfoRes);
}