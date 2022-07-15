const externalAPIService = require("./externalAPIService");
const externalAPIProvider = require("./externalAPIProvider");

const response = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponseStatus = require("../../../config/baseResponseStatus");

exports.postAstroInfo = async function (req, res){
    const postAstroInfoRes = await externalAPIService.postAstroInfo(req.params)

    return res.send(postAstroInfoRes);
}

exports.getAstroInfo = async function (req, res){
    const getAstroInfoRes = await externalAPIProvider.getAstroInfo(req.params);

    return res.send(getAstroInfoRes);
}