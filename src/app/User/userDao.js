// 이메일로 회원 중복 조회
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
                    SELECT COUNT(email) AS userCount
                    FROM USER
                    WHERE email = ?
                  `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
        insert into USER(name, email, password, member, generation) 
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
    select COUNT(email)
    from USER
    WHERE email = ? AND password = ?;
  `
  const signinUserRow = await connection.query(
    signinUserQuery,
    signinUserParams
  )

  return signinUserRow;
}

module.exports = {
    selectUserEmail,
    insertUserInfo,
    signinUser
}