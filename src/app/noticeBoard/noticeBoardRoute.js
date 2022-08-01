module.exports = function(app){
    const noticeController = require('./noticeBoardController.js');
    const {imageUploader} = require('./s3ImgUploader');

    //1. 일반 게시글 작성 API
    app.post('/app/notice/upload', imageUploader.any('images'), noticeController.postNoticeBoard)
}