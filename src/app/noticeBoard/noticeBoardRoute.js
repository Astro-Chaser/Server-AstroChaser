module.exports = function(app){
    const noticeController = require('./noticeBoardController.js');
    const {imageUploader} = require('./s3ImgUploader');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //1. 일반 게시글 작성 API
    app.post('/app/notice/upload', jwtMiddleware, imageUploader.any('images'), noticeController.postNoticeBoard);

    //2. 일반 게시글 타이틀 가져오기 API
    app.get('/app/notice/title', noticeController.getNoticeTitle);

}