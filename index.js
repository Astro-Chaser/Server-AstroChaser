const MobileDetect = require('mobile-detect');

// node_modules의 express 패키지를 가져온다.
var express = require('./config/express')
var expressForStatic = require("express");

//app이라는 변수에 express 함수의 변환 값을 저장한다.
var app = express()

//환경변수에서 port를 가져온다. 환경변수가 없을시 8000포트를 지정한다.
var port = app.listen(process.env.PORT || 8000);

// 정적 파일 불러오기
app.use(expressForStatic.static(__dirname + "/frontWEB/static"));

//html 정의 시작
//1. index 페이지
app.get('/', function(req, res) {
    const md = new MobileDetect(req.headers['user-agent']);
         if (md.mobile()) { 
             res.sendFile(__dirname+"/frontWEB/m_yj_index.html");
         }
         else { 
            res.sendFile(__dirname+"/frontWEB/yj_index.html");
        }
   }  
)
app.get('/sh', function(req, res) {
    res.sendFile(__dirname+"/frontWEB/sh_index.html");
})
app.get('/old', function(req, res) {
    res.sendFile(__dirname+"/frontWEB/index.html");
})

app.get('/m', function(req, res) {
    res.sendFile(__dirname+"/frontWEB/mobile_index.html");
})

app.get('/user/signup', function(req, res) {
    const md = new MobileDetect(req.headers['user-agent']);
    if (md.mobile()) { 
        res.sendFile(__dirname+"/frontWEB/m_signup.html");
    }
    else { 
        res.sendFile(__dirname+"/frontWEB/signup.html");
   }
})

//로그인 페이지
app.get('/user/signin', function(req, res){
    const md = new MobileDetect(req.headers['user-agent']);
         if (md.mobile()) { 
            res.sendFile(__dirname+"/frontWEB/m_signin.html");
         }
         else { 
            res.sendFile(__dirname+"/frontWEB/signin.html");
        }
})

//2. 망원경 관련 페이지
app.get('/telescopes/owned', function(req, res) {
    res.sendFile(__dirname+"/frontWEB/telescopes.html");
})

app.get('/telescopes/manual', function(req, res) {
    res.sendFile(__dirname+"/frontWEB/telescope-setting.html");
})

//3. 사진 게시판 페이지
app.get('/gallery', function(req, res){
    res.sendFile(__dirname+"/frontWEB/pictureNoticeBoard.html")
})
app.get('/gallery/editor', function(req, res){
    res.sendFile(__dirname+"/frontWEB/picturenoticeboardEditor.html")
    
})
app.get('/gallery/:pageNum', function(req, res){
    res.sendFile(__dirname+"/frontWEB/pictureNoticeBoardContent.html")
})

//4. 공지 페이지
app.get('/notice', function(req, res){
    const md = new MobileDetect(req.headers['user-agent']);
         if (md.mobile()) { 
             res.sendFile(__dirname+"/frontWEB/m_noticeBoard.html");
         }
         else { 
            res.sendFile(__dirname + "/frontWEB/noticeBoard.html");
        }
})
app.get('/notice/editor', function(req, res){
    res.sendFile(__dirname + "/frontWEB/noticeboardEditor.html");
})

app.get('/notice/:pageNum', function(req, res){
    const md = new MobileDetect(req.headers['user-agent']);
         if (md.mobile()) { 
             res.sendFile(__dirname+"/frontWEB/m_noticeBoardContent.html");
         }
         else { 
            res.sendFile(__dirname + "/frontWEB/noticeBoardContent.html");
        }
})

app.get('/chasing/notice', function(req, res){
    const md = new MobileDetect(req.headers['user-agent']);
    if (md.mobile()) { 
        res.sendFile(__dirname + "/frontWEB/m_chasingNoticeBoard.html");
    }
    else { 
        res.sendFile(__dirname + "/frontWEB/chasingNoticeBoard.html");
   }
    
})
app.get('/chasing/notice/editor', function(req, res){
    res.sendFile(__dirname + "/frontWEB/chasingNoticeboardEditor.html");
})
app.get('/chasing/notice/:pageNum', function(req, res){
    const md = new MobileDetect(req.headers['user-agent']);
    if (md.mobile()) { 
        res.sendFile(__dirname + "/frontWEB/m_chasingNoticeBoardContent.html");
    }
    else { 
        res.sendFile(__dirname + "/frontWEB/chasingNoticeBoardContent.html");
   }
    
})

app.get('/free-board', function(req, res){
    res.sendFile(__dirname + "/frontWEB/userFreeBoard.html");
})
app.get('/free-board/editor', function(req, res){
    res.sendFile(__dirname + "/frontWEB/userFreeBoardEditor.html");
})
app.get('/free-board/:pageNum', function(req, res){
    res.sendFile(__dirname + "/frontWEB/userFreeBoardContent.html");
})

//5. 회칙 페이지
app.get('/rules', function(req, res){
    const md = new MobileDetect(req.headers['user-agent']);
         if (md.mobile()) { 
             res.sendFile(__dirname+"/frontWEB/m_acRules.html");
         }
         else { 
            res.sendFile(__dirname + "/frontWEB/acRules.html");
        }
})

//6. 천문학 & 천문소식 페이지
app.get('/astro-event', function(req, res){
    res.sendFile(__dirname + "/frontWEB/astroEvents.html");
})

//7. 연혁 페이지
app.get('/history', function(req, res){
    const md = new MobileDetect(req.headers['user-agent']);
         if (md.mobile()) { 
            res.sendFile(__dirname + "/frontWEB/m_history.html");
         }
         else { 
            res.sendFile(__dirname + "/frontWEB/history.html");
        }
    
})

//7. 조직도 페지
app.get('/organization-chart', function(req, res){
    const md = new MobileDetect(req.headers['user-agent']);
         if (md.mobile()) { 
            res.sendFile(__dirname + "/frontWEB/m_organizationChart.html");
         }
         else { 
            res.sendFile(__dirname + "/frontWEB/organizationChart.html");
        }
    
})
// express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
app.listen(port, function() {
    console.log('start! express server');
})