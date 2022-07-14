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
        console.log(astroInfoJson)
        console.log("=====================")
        console.log(astroInfoJson.elements[0]);
        console.log("*********************");
        console.log("+++++")
        console.log(astroInfoJson.elements[0].elements[1]);
        console.log(astroInfoJson.elements[0].elements[1].elements[0]);
        console.log(astroInfoJson.elements[0].elements[1].elements[1]);
        console.log("stop")
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements)
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0])
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[0])
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[1])
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[3])

        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[1])
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[1].elements[0])
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[1].elements[1])
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[1].elements[3])

        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[3].elements[0].text)

        console.log("for....in start")
        for(const property in astroInfoJson.elements[0].elements[1].elements[0].elements){
            if(property==0){
                console.log(`${property}: ${astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[0].elements[0].text}`)   
                console.log(`${property}: ${astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[3].elements[0].text}`)   
                continue;
            }
            console.log(`${property}: ${astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[0].elements[0].text}`)   
            console.log(`${property}: ${astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[1].elements[0].text}`)  
            console.log(`${property}: ${astroInfoJson.elements[0].elements[1].elements[0].elements[property].elements[3].elements[0].text}`)  
        }
        console.log("*********************")
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[0]);
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[1]);
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[2]);
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[3]);
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[0].elements[4]);
        console.log("****")
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[1]);
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[1].elements[0]);
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[1].elements[1]);
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[1].elements[3]);
        console.log(astroInfoJson.elements[0].elements[1].elements[0].elements[1].elements[4]);
        console.log("****")
        console.log(astroInfoJson.elements[0].elements[1].elements[1].elements[0].text);//이것이 총 몇개의 이벤트가 있나
        console.log(astroInfoJson.elements[0].elements[1].elements[2]);
        console.log(astroInfoJson.elements[0].elements[1].elements[3]);
        console.log("=====================")

        function doRequest(url) {
            return new Promise(function (resolve, reject) {
              request(url, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    var xmlTOjs = require('xml-js');
                    var getAstroInfo = xmlTOjs.xml2json(body);
                    console.log(typeof(getAstroInfo));
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

  

