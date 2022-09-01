module.exports = function(app){
    const chasingHistory = require('./chasingHistoryController');
    const {imageUploader} = require('./s3ImgUploader');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //1. 게시판 타이틀 가져오기 API
    app.get('/app/picture-board/title', chasingHistory.getChasingHistoryTitle);

    //2. 게시판 사진 업로드 API
    app.post('/app/picture-board/upload', imageUploader.any('images'), chasingHistory.postChasingHistory);

    //3. 게시판 내용물 가져오기 API
    app.get('/app/picture-board/:pageNum', chasingHistory.getChasingHistoryContent);

    //4. 게시판 댓글 달기 API
    app.post('/app/picture-board/comment', jwtMiddleware, chasingHistory.postComment);

    //5. 게시판 댓글 불러오기 API
    app.get('/app/picture-board/comment/get', chasingHistory.getComment);

    //6. 게시판 사진 모두 불러오기 API
    app.get('/app/picture-board/pictures/all', chasingHistory.getAllPictures);
}