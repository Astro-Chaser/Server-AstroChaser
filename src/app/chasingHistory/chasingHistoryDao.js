//1. chasingHistory 대문 가져오기
async function getChasingHistory(connection){
    const getChasingHistoryQuery = `
    SELECT PNB.id id, PNB.createdAt createdAt, writerId, title, mediaUrl
    FROM PictureNoticeBoard AS PNB INNER JOIN PictureNoticeBoardMedia AS PNBM on PNB.id = PNBM.pictureBardId
    GROUP BY title ORDER BY PNB.createdAt DESC;
    `
    const [getChasingHistoryRow] = await connection.query(getChasingHistoryQuery);

    return getChasingHistoryRow;
}

//2. chasingHistory 게시글 저장하기
async function postChasingHistory(connect, postChasingHistoryParams){
    let result = new Object();
    const insertChasingHistoryTitleQuery = `
    INSERT INTO PictureNoticeBoard(writerId, title, content)
    VALUES ((SELECT id FROM User WHERE email = '${postChasingHistoryParams.writerEmail}'), '${postChasingHistoryParams.title}', '${postChasingHistoryParams.content}');
`   
    const insertQueryRes = await connect.query(insertChasingHistoryTitleQuery);
    if(insertQueryRes[0].affectedRows == 1)
    {
        result.titleInptRes = 'SUCCESS';
        const insertMediaQuery = `INSERT INTO PictureNoticeBoardMedia(pictureBardId, mediaUrl) VALUES (${insertQueryRes[0].insertId}, ?)`
        for(var i in postChasingHistoryParams.pictureUrls)
        {
            //console.log(postChasingHistoryParams.pictureUrls[i]);
            const insertMediaQueryRes = await connect.query(insertMediaQuery, postChasingHistoryParams.pictureUrls[i])
            if(insertMediaQueryRes[0].affectedRows != 1) 
            {
                result.mediaInptRes = 'FAIL';
                break;
            }
        }
        result.mediaInptRes = 'SUCCESS';
        
    }
    else  result.titleInptRes = 'FAIL';

    return result
}


module.exports ={
    getChasingHistory,
    postChasingHistory
}