module.exports = function(app){
    const chasingHistory = require('./chasingHistoryController');
    const {imageUploader} = require('./s3ImgUploader');

    //1. 게시판 타이틀 가져오기 API
    app.get('/app/picture-board/title', chasingHistory.getChasingHistoryTitle);

    //2. 게시판 사진 업로드 API
    app.post('/app/picture-board/upload', imageUploader.any('images'), chasingHistory.postChasingHistory);

    //2. 게시판 내용물 가져오기 API
    app.get('/app/picture-board/:pageNum', chasingHistory.getChasingHistoryContent);
}