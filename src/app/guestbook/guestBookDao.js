//방명록 작성
async function createGuestBook(connection, createGuestBookParams){
    const createGuestBookQuery=`
                                insert into GuestBook(writer, content)
                                VALUES (?, ?);
                                `
    console.log("hihi");                  
    const createGuestBookRow = await connection.query(
        createGuestBookQuery,
        createGuestBookParams
    );
    
    return createGuestBookRow;
}

module.exports = {
    createGuestBook
}