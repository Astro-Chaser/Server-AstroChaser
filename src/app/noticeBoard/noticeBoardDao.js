//1. 일반 공지 게시글 작성하기
async function postNoticeBoard(connect, postNoticeBoardParams){
    let result = new Object();
    const insertNoticeBoardTitleQuery = 
    `
        INSERT INTO NormalNoticeBoard(writerId, title, content)
        VALUES (${postNoticeBoardParams.writerid}, '${postNoticeBoardParams.title}', '${postNoticeBoardParams.content}');
    `   
    
    const insertQueryRes = await connect.query(insertNoticeBoardTitleQuery);
    
    if(insertQueryRes[0].affectedRows == 1)
    {
        result.titleInptRes = 'SUCCESS';
        if(postNoticeBoardParams.pictureUrls.length != 0)
        {
            const insertMediaQuery = `INSERT INTO NormalNoticeBoardMedia(NormalNoticeBoardId, mediaUrl) VALUES (${insertQueryRes[0].insertId}, ?)`
            for(var i in postNoticeBoardParams.pictureUrls)
            {   
                const insertMediaQueryRes = await connect.query(insertMediaQuery, postNoticeBoardParams.pictureUrls[i])
                if(insertMediaQueryRes[0].affectedRows != 1) 
                {
                    result.mediaInptRes = 'FAIL';
                    break;
                }
            }
            result.mediaInptRes = 'SUCCESS';
        }
        else if(postNoticeBoardParams.pictureUrls.length == 0)
        {
            result.mediaInptRes = 'NULL BUT SUCCESS';
        }
    }
    else  result.titleInptRes = 'FAIL';

    return result
}

//2. 일반 공지 게시글 타이틀 가져오기
async function getNoticeTitle(connection){
    const getNoticeTitleQuery = `
        SELECT id, createdat, updatedat, writerid, title, content
        FROM NormalNoticeBoard
        WHERE state='A'
        ORDER BY updatedAt DESC;
    `
    console.log("hi")
    const [getNoticeTitleRow] = await connection.query(getNoticeTitleQuery);

    return getNoticeTitleRow;
}
module.exports ={
    postNoticeBoard,
    getNoticeTitle
}