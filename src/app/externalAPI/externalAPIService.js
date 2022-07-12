const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {serviceKey} = require("../../../config/serviceKey");
const externalAPIDao = require("./externalAPIDao");

const {connect} = require("http2");

exports.getAstroInfo = async function(req, res){
    try{
        let astroInfo;
        const paramSolYear = req.year;
        const paramSolMonth = req.month;

        const hostUrl = `http://apis.data.go.kr/B090041/openapi/service/AstroEventInfoService/getAstroEventInfo?serviceKey=${serviceKey}&solYear=${paramSolYear}&solMonth=${paramSolMonth}`
        var request = require('request');
        var options = {
            'method': 'GET',
            'url': hostUrl,
            'headers': {
            }
        };
        astroInfo = await doRequest(options);
        console.log(astroInfo)

        function doRequest(url) {
            return new Promise(function (resolve, reject) {
              request(url, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    var xmlTOjs = require('xml-js');
                    var getAstroInfo = xmlTOjs.xml2json(body);
                  resolve(getAstroInfo);
                } else {
                  reject(error);
                }
              });
            });
        }
          
        // function doRequest(options){
        //     request(options, function (error, response) {
        //         if (error) 
        //         {
        //             console.log(error)
        //             throw new Error(error);
        //         }
        //         if (!error) {
        //             var xmlTOjs = require('xml-js');
        //             var getAstroInfo = xmlTOjs.xml2json(response.body);
        //             return(getAstroInfo);
        //           }
        //     });
        // }
        return response(baseResponse.SUCCESS, astroInfo);
        
    }
    catch{
        return errResponse(baseResponse.EXTERNAL_API_CONNECTION_ERROR, "no");
    }
}

  

