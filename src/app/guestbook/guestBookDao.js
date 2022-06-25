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

//방명록 반환
async function getGuestbook(connection){
    const getGuestbookQuery = `select writer, content, createdAt
                                from GuestBook
                                where state='A';`

    const [getGuestbookRow] = await connection.query(getGuestbookQuery);

    return getGuestbookRow;
}


module.exports = {
    createGuestBook,
    getGuestbook
}