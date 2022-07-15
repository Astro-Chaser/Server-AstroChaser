module.exports = function(app){
    const externalApi = require('./externalAPIController');

    //1. 천문정보 DB에 넣기
    app.post('/app/astro-info/:year/:month', externalApi.postAstroInfo)

    //2. 천문정보 DB에서 뽑아오기
    app.get('/app/astro-info/:year/:month', externalApi.getAstroInfo)
}