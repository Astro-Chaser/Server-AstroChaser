//방명록 작성
async function createGuestBook(connection, createGuestBookParams){
    const createGuestBookQuery=`
                                insert into GuestBook(writer, content)
                                VALUES (?, ?);
                                `                 
    const createGuestBookRow = await connection.query(
        createGuestBookQuery,
        createGuestBookParams
    );

    return createGuestBookRow;
}

//방명록 조회
async function getGuestbook(connection){
    const getGuestbookQuery = `select writer, content, createdAt
                                from GuestBook
                                where state='A'
                                ORDER BY createdAt DESC;`

    const [getGuestbookRow] = await connection.query(getGuestbookQuery);

    return getGuestbookRow;
}


module.exports = {
    createGuestBook,
    getGuestbook
}