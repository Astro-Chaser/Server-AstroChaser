// 이메일로 회원 중복 조회
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
                    SELECT COUNT(email) AS userCount
                    FROM User
                    WHERE email = ?
                  `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
        insert into User(name, email, password, member, generation) 
        VALUES(?, ?, ?, ?, ?);
      `;
    const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
    );
  
    return insertUserInfoRow;
}

//유저 로그인
async function signinUser(connection, signinUserParams){
  const signinUserQuery =`
    SELECT id, createdAt, updatedAt, name, email, generation, member, state
    FROM User
    WHERE email = ? AND password = ? AND state = 'A';
  `
  const signinUserRow = await connection.query(
    signinUserQuery,
    signinUserParams
  )
  return signinUserRow[0][0];
}

//Refresh Token 저장
async function saveRefreshToken(connection, refreshTokenParams){
  const refreshTokenQuery = `
    insert into RefreshToken (email, refreshToken) VALUES (?, ?)
  `
  
  connection.query(
    refreshTokenQuery,
    refreshTokenParams,
    function (err, result) {
      if (err) throw err;
      
      console.log(`${result.affectedRows}개의 Refresh Token 추가됨.`);
    });

  return 1;
}

//Refresh Token 업데이트
async function updateRefreshToken(connection, refreshTokenParams){
  const refreshTokenQuery = `
    UPDATE RefreshToken SET refreshToken = ? WHERE email = ?
  `
  
  connection.query(
    refreshTokenQuery,
    refreshTokenParams,
    function (err, result) {
      if (err) throw err;
      
      console.log(`${result.affectedRows}개의 Refresh Token 추가됨.`);
    });

  return 1;
}

//user 조회 - email
async function checkToken(connection, email){
  const getUserByEmail = `
  SELECT id, createdat, updatedat, name, email, generation, member, state
  FROM User
  WHERE email='${email}';
  `
  const checkUserByEmailRow = await connection.query(getUserByEmail);

  return checkUserByEmailRow[0][0];
}

//refresh Token 조희
async function refreshCheck(connection, refreshToken, email){
  const refreshCheckQuery = `
    SELECT RT.refreshToken As refreshToken, User.id, User.createdAt, name, User.email, generation, member, state
    FROM RefreshToken AS RT INNER JOIN User On RT.email = User.email
    WHERE RT.email = '${email}' AND refreshToken = '${refreshToken}'
    `
  
  const refreshCheckRow = await connection.query(refreshCheckQuery);

  return refreshCheckRow[0][0];
}

module.exports = {
    selectUserEmail,
    insertUserInfo,
    signinUser,
    saveRefreshToken,
    updateRefreshToken,
    checkToken,
    refreshCheck,
}