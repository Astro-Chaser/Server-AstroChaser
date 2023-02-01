const axios = require('axios');

module.exports = function(app){
    const guestbook = require('./guestbookController');
    
    //1. 방명록 작성 API
    app.post('/app/guestbook', guestbook.postGuestbook);

    //2. 방명록 조회 API
    app.get('/app/guestbook', );
    // app.get('/app/guestbook', guestbook.getGuestbook);
}