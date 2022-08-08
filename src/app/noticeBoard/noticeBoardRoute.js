module.exports = function(app){
    const noticeController = require('./noticeBoardController');
    const {imageUploader} = require('./s3ImgUploader');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //1. 일반 게시글 작성 API
    app.post('/app/notice/upload', jwtMiddleware, imageUploader.any('images'), noticeController.postNoticeBoard);

    //2. 일반 게시글 타이틀 가져오기 API
    app.get('/app/notice/title/:type', noticeController.getNoticeTitle);

    //3. 일반 게시글 내용 가져오기 API
    app.get('/app/notice/:type/:num', noticeController.getNoticeContent);

    //4. 게시글 댓글달기 API
    app.post('/app/notice/comment', jwtMiddleware, noticeController.postComment);

    //5. 게시글 댓글 불러오기 API
    app.get('/app/notice/comment', noticeController.getComment);

}