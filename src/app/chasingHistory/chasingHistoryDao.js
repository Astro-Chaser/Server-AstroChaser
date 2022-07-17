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


module.exports ={
    getChasingHistory,
}