module.exports = function(app){
    const externalApi = require('./externalAPIController');

    //1. 천문정보
    app.post('/app/astro-info/:year/:month', externalApi.getAstroInfo)
}