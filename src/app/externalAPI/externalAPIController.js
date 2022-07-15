const externalAPIService = require("./externalAPIService");

const response = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponseStatus = require("../../../config/baseResponseStatus");

exports.postAstroInfo = async function (req, res){
    const getAstroInfoRes = await externalAPIService.postAstroInfo(req.params)

    return res.send(getAstroInfoRes);
}