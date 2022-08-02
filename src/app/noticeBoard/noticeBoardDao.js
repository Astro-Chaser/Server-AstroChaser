//1. 일반 공지 게시글 작성하기
async function postNoticeBoard(connect, postNoticeBoardParams){
    let result = new Object();
    let insertQueryRes;
    if(postNoticeBoardParams.type == 'CHASING' || postNoticeBoardParams.type == 'chasing')
    {
        const insertNoticeBoardTitleQuery = 
        `
            INSERT INTO NormalNoticeBoard(writerId, title, content, type)
            VALUES (${postNoticeBoardParams.writerid}, '${postNoticeBoardParams.title}', '${postNoticeBoardParams.content}', 'CHASING');
        `   
        insertQueryRes = await connect.query(insertNoticeBoardTitleQuery);
    }
    else
    {
        const insertNoticeBoardTitleQuery = 
        `
            INSERT INTO NormalNoticeBoard(writerId, title, content)
            VALUES (${postNoticeBoardParams.writerid}, '${postNoticeBoardParams.title}', '${postNoticeBoardParams.content}');
        `   
        insertQueryRes = await connect.query(insertNoticeBoardTitleQuery);

    }
    
   
    
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
async function getNoticeTitle(connection, type){
    if(type == 'normal')
    {
        const getNoticeTitleQuery = `
            SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, title, content, viewCount
            FROM NormalNoticeBoard AS NNB INNER JOIN User ON User.id = NNB.writerId
            WHERE User.state='A' AND NNB.state='A' AND NNB.type='NORMAL'
            ORDER BY updatedAt DESC;
        `
        const [getNoticeTitleRow] = await connection.query(getNoticeTitleQuery);
    
        return getNoticeTitleRow;
    }
    else if(type = 'CHASING'){
        const getNoticeTitleQuery = `
            SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, title, content, viewCount
            FROM NormalNoticeBoard AS NNB INNER JOIN User ON User.id = NNB.writerId
            WHERE User.state='A' AND NNB.state='A' AND NNB.type='CHASING'
            ORDER BY updatedAt DESC;
        `
        const [getNoticeTitleRow] = await connection.query(getNoticeTitleQuery);
    
        return getNoticeTitleRow;
    }
}

//3. 일반 공지 게시글 내용물 가져오기
async function getNoticeContent(connection, pageNum, type){
    if(type == 'normal')
    {
        const getNoticeMediaCountQuery = `
        SELECT COUNT(*) AS IS_EXIST
        FROM NormalNoticeBoardMedia AS NNBM, NormalNoticeBoard AS NNB
        WHERE NNBM.NormalNoticeBoardId = NNB.id AND NNBM.NormalNoticeBoardId = ${pageNum} AND NNB.type='NORMAL';
        ` 
        const getNoticeMediaCountRow = await connection.query(getNoticeMediaCountQuery);
        if(getNoticeMediaCountRow[0][0].IS_EXIST == 0)
        {
            const getNoticeQuery = `
                SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, title, content, viewCount
                FROM NormalNoticeBoard AS NNB INNER JOIN User ON User.id = NNB.writerId
                WHERE User.state='A' AND NNB.state='A' AND NNB.id= ${pageNum} AND NNB.type='NORMAL'
                ORDER BY updatedAt DESC;
            `
            const [getNoticeContentRes] = await connection.query(getNoticeQuery);
            return getNoticeContentRes;
        }
        
        else if(getNoticeMediaCountRow[0][0].IS_EXIST != 0)
        {
            const getNoticeMediaQuery = `
            SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, NNB.title, NNB.content, NNB.viewCount, NNBM.mediaUrl
            FROM NormalNoticeBoard AS NNB INNER JOIN (User, NormalNoticeBoardMedia AS NNBM ) ON User.id = NNB.writerId AND  NNBM.NormalNoticeBoardId = NNB.id
            WHERE User.state='A' AND NNB.state='A' AND NNBM.NormalNoticeBoardId = ${pageNum} AND NNB.type='NORMAL'
            ORDER BY updatedAt DESC;
            `
            const [getNoticeMediaRow] = await connection.query(getNoticeMediaQuery);
            return getNoticeMediaRow;
        }
    }
    else if(type == 'chasing')
    {
        const getNoticeMediaCountQuery = `
        SELECT COUNT(*) AS IS_EXIST
        FROM NormalNoticeBoardMedia AS NNBM, NormalNoticeBoard AS NNB
        WHERE NNBM.NormalNoticeBoardId = NNB.id AND NNBM.NormalNoticeBoardId = ${pageNum} AND NNB.type='CHASING';
        ` 
        const getNoticeMediaCountRow = await connection.query(getNoticeMediaCountQuery);
        if(getNoticeMediaCountRow[0][0].IS_EXIST == 0)
        {
            const getNoticeQuery = `
                SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, title, content, viewCount
                FROM NormalNoticeBoard AS NNB INNER JOIN User ON User.id = NNB.writerId
                WHERE User.state='A' AND NNB.state='A' AND NNB.id= ${pageNum} AND NNB.type='CHASING'
                ORDER BY updatedAt DESC;
            `
            const [getNoticeContentRes] = await connection.query(getNoticeQuery);
            return getNoticeContentRes;
        }
        
        else if(getNoticeMediaCountRow[0][0].IS_EXIST != 0)
        {
            const getNoticeMediaQuery = `
            SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, NNB.title, NNB.content, NNB.viewCount, NNBM.mediaUrl
            FROM NormalNoticeBoard AS NNB INNER JOIN (User, NormalNoticeBoardMedia AS NNBM ) ON User.id = NNB.writerId AND  NNBM.NormalNoticeBoardId = NNB.id
            WHERE User.state='A' AND NNB.state='A' AND NNBM.NormalNoticeBoardId = ${pageNum} AND NNB.type='CHASING'
            ORDER BY updatedAt DESC;
            `
            const [getNoticeMediaRow] = await connection.query(getNoticeMediaQuery);
            return getNoticeMediaRow;
        }
    }
    
    
}


module.exports ={
    postNoticeBoard,
    getNoticeTitle,
    getNoticeContent
}