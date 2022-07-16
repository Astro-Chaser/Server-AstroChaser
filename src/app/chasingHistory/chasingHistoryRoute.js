module.exports = function(app){
    const chasingHistory = require('./chasingHistoryController');

    //1. 게시판 타이틀 가져오기 API
    app.get('/app/picture-board/title', chasingHistory.getChasingHistoryTitle);
}