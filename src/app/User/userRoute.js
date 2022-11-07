module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    // app.get('/app/test', user.getTest)

    // 1. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    // 2. 유저 로그인 API
    app.post('/app/users/signin', user.signinUser);

    // 3. 유저 JWT 검중
    app.post('/app/users/auto-login', jwtMiddleware, user.checkToken)
    app.get('/app/users/auto-login', jwtMiddleware, user.checkToken)

    // 4. 유저 JWT 검증 실패시 Refresh Token검증.
    // 성공시 -> Access Token & Refresh Token 재발급
    // 실패시 -> 재 로그인 요청하여 Access Token & Refresh Token 재발급
    app.post('/app/users/auto-login/failed', user.updateToken);
};