module.exports = {

    // 단순 API SUCCESS
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    //DB관련 Error코드
    DB_ERROR : { "isSuccess": false, "code": 5000, "message": "DB연결 실패" },

    //외부 API관련 Error코드
    EXTERNAL_API_CONNECTION_ERROR : { "isSuccess": false, "code": 5010, "message": "외부 API연결 실패" },

    // User -> 회원가입 관련 Error 코드
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요."},
    SIGNUP_NAME_EMPTY : { "isSuccess": false, "code": 2002, "message":"이름을 입력해주세요."},
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2003, "message":"비밀번호를 입력해주세요."},
    SIGNUP_EMAIL_DUPLICATED : { "isSuccess": false, "code": 2004, "message":"이미 가입된 회원입니다."},

    // User -> 로그인 관련 Error 코드
    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2101, "message":"이메일을 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2102, "message":"비밀번호를 입력해주세요." },
    SIGNIN_FAILED : { "isSuccess": false, "code": 2104, "message":"이메일/비밀번호를 확인해주세요."},

    // Guestbook -> 방명록 관련 Error 코드
    GUESTBOOK_WRITER_EMPTY : {"isSuccess": false, "code": 3001, "message":"닉네임을 입력해주세요."},
    GUESTBOOK_CONTENT_EMPTY : {"isSuccess": false, "code": 3001, "message":"방명록 내용을 입력해주세요."}
}