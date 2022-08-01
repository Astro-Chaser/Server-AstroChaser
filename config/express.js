const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());
    // app.use(express.static(process.cwd() + '/public'));

    //domain 추가
    require('../src/app/User/userRoute')(app);
    require('../src/app/guestbook/guestbookRoute')(app);
    require('../src/app/externalAPI/externalAPIRoute')(app);
    require('../src/app/chasingHistory/chasingHistoryRoute')(app);
    require('../src/app/noticeBoard/noticeBoardRoute')(app);

    return app;
};