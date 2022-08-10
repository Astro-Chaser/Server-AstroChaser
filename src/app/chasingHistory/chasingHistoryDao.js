//1. chasingHistory 대문 가져오기
async function getChasingHistory(connection){
    const getChasingHistoryQuery = `
    SELECT PNB.id id, PNB.createdAt createdAt, writerId, title, mediaUrl, PNB.state
    FROM PictureNoticeBoard AS PNB INNER JOIN PictureNoticeBoardMedia AS PNBM on PNB.id = PNBM.pictureBardId
    WHERE PNB.state = 'A'
    GROUP BY title;
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

//3. 게시글 가져오기
async function getChasingHistoryContent(connection, pageNum){
    const getChasingHistoryContentQuery = `
    SELECT User.generation AS generation, User.name AS name, User.member AS member, PNB.id AS id, PNB.createdAt AS createdAt, PNB.title AS title, PNB.content AS content, PNB.state AS state, PNBM.mediaUrl AS mediaUrl
    FROM User INNER JOIN PictureNoticeBoard AS PNB ON User.id = PNB.writerId INNER JOIN PictureNoticeBoardMedia AS PNBM  ON PNB.id = PNBM.pictureBardId
    WHERE PNB.id = ${pageNum} AND PNB.state = 'A';
    `

    const [getChasingHistoryContentRow] = await connection.query(getChasingHistoryContentQuery);

    return getChasingHistoryContentRow;
}

//4. 게시글 댓글 달기
async function postComment(connect, postCommentParams){
    const postCommentQuery = `
    INSERT INTO  PictureNoticeBoardComments(pictureNoticeBoardId, writerId, upperCommentId, content) VALUES(${postCommentParams.postId}, ${postCommentParams.writerId}, ${postCommentParams.upperId}, '${postCommentParams.content}')
    `

    const postCommentRow = await connect.query(postCommentQuery);

    return postCommentRow;
} 

module.exports ={
    getChasingHistory,
    postChasingHistory,
    getChasingHistoryContent,
    postComment,
}