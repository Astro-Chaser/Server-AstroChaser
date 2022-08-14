const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {serviceKey} = require("../../../config/serviceKey");
const externalAPIDao = require("./externalAPIDao");

const {connect} = require("http2");

exports.postAstroInfo = async function(req, res){
    try{
        let rowCnt = 0;
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
        let astroInfo = await doRequest(options);
        astroInfoJson = JSON.parse(astroInfo);

        let astroInfoParams = new Array();


        for(const property in astroInfoJson.elements[0].elements[1].elements[0].elements){
            var astroEventData = new Object();
            if(astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[1].elements == undefined){
                astroEventData.content = astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[0].elements[0].text;
                astroEventData.date = astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[3].elements[0].text;
                astroEventData.isMonthTitle = true;
                astroInfoParams.push(astroEventData);
                continue;
            }
            astroEventData.content = astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[0].elements[0].text;
        
            astroEventData.time = astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[1].elements[0].text;
            astroEventData.date = astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[3].elements[0].text;
            astroEventData.isMonthTitle = false;
            astroInfoParams.push(astroEventData);
        }
        
        //정보 DAO에 저장하기
        const connection = await pool.getConnection(async (conn) => conn);
        const insertAstroEventResult = await externalAPIDao.insertAstroEvent(connection, astroInfoParams);
        connection.release();
        //console.log(insertAstroEventResult);
        if(insertAstroEventResult==0)
        {
            return errResponse(baseResponse.EXTERNAL_API_CONNECTION_ERROR)
        }
        else{
            return response(baseResponse.SUCCESS, `${req.year}년 ${req.month}월 천문현상 정보 추가됨.`);
        }


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
        
    }
    catch{
        return errResponse(baseResponse.EXTERNAL_API_CONNECTION_ERROR, "no");
    }
}

  

