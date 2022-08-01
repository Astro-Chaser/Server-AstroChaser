module.exports = function(app){
    const noticeController = require('./noticeBoardController.js');
    const {imageUploader} = require('./s3ImgUploader');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //1. 일반 게시글 작성 API
    /** TO DO
     * ACCESS JWT에서 유저 정보 뽑아내기
     */
    app.post('/app/notice/upload', jwtMiddleware, imageUploader.any('images'), noticeController.postNoticeBoard)
}