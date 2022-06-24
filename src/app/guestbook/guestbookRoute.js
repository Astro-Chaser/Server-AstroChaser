module.exports = function(app){
    const guestbook = require('./guestbookController');
    
    //1. 방명록 작성 API
    app.post('/app/guestbook', guestbook.postGuestbook);
}