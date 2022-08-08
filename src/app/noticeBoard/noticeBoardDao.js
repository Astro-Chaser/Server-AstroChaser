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
async function getNormalNoticeTitle(connection){
        const getNormalNoticeTitleQuery = `
            SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, title, viewCount
            FROM NormalNoticeBoard AS NNB, User
            WHERE User.id = NNB.writerId AND User.state='A' AND NNB.state='A' AND NNB.type='NORMAL'
        `
        const [getNoticeTitleRow] = await connection.query(getNormalNoticeTitleQuery);
    
        return getNoticeTitleRow;
}

async function getChasingNormalTitle(connection){
    const getChasingNoticeTitleQuery = `
            SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, title, content, viewCount
            FROM NormalNoticeBoard AS NNB INNER JOIN User ON User.id = NNB.writerId
            WHERE User.state='A' AND NNB.state='A' AND NNB.type='CHASING'
        `
        const [getNoticeTitleRow] = await connection.query(getChasingNoticeTitleQuery);
    
        return getNoticeTitleRow;
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
                ORDER BY createdAt DESC;
            `
            const [getNoticeContentRes] = await connection.query(getNoticeQuery);
            
            const viewUpdateQuery = `
            UPDATE NormalNoticeBoard
            SET viewCount = viewCount+1
            WHERE NormalNoticeBoard.id=${pageNum};
            `
            await connection.query(viewUpdateQuery);
            
            return getNoticeContentRes;
        }
        
        else if(getNoticeMediaCountRow[0][0].IS_EXIST != 0)
        {
            const getNoticeMediaQuery = `
            SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, NNB.title, NNB.content, NNB.viewCount, NNBM.mediaUrl
            FROM NormalNoticeBoard AS NNB INNER JOIN (User, NormalNoticeBoardMedia AS NNBM ) ON User.id = NNB.writerId AND  NNBM.NormalNoticeBoardId = NNB.id
            WHERE User.state='A' AND NNB.state='A' AND NNBM.NormalNoticeBoardId = ${pageNum} AND NNB.type='NORMAL'
            ORDER BY createdAt DESC;
            `

            const viewUpdateQuery = `
            UPDATE NormalNoticeBoard
            SET viewCount = viewCount+1
            WHERE NormalNoticeBoard.id=${pageNum};
            `
            await connection.query(viewUpdateQuery);
            
            const [getNoticeMediaRow] = await connection.query(getNoticeMediaQuery);
            return getNoticeMediaRow;
        }
    }
    else if(type == 'chasing' || type == 'CHASING')
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
                ORDER BY createdAt DESC;
            `
            const [getNoticeContentRes] = await connection.query(getNoticeQuery);

            const viewUpdateQuery = `
            UPDATE NormalNoticeBoard
            SET viewCount = viewCount+1
            WHERE NormalNoticeBoard.id=${pageNum};
            `
            await connection.query(viewUpdateQuery);

            return getNoticeContentRes;
        }
        
        else if(getNoticeMediaCountRow[0][0].IS_EXIST != 0)
        {
            const getNoticeMediaQuery = `
            SELECT NNB.id, NNB.createdat, NNB.updatedat, User.name, NNB.title, NNB.content, NNB.viewCount, NNBM.mediaUrl
            FROM NormalNoticeBoard AS NNB INNER JOIN (User, NormalNoticeBoardMedia AS NNBM ) ON User.id = NNB.writerId AND  NNBM.NormalNoticeBoardId = NNB.id
            WHERE User.state='A' AND NNB.state='A' AND NNBM.NormalNoticeBoardId = ${pageNum} AND NNB.type='CHASING'
            ORDER BY createdAt DESC;
            `
            const [getNoticeMediaRow] = await connection.query(getNoticeMediaQuery);
            const viewUpdateQuery = `
            UPDATE NormalNoticeBoard
            SET viewCount = viewCount+1
            WHERE NormalNoticeBoard.id=${pageNum};
            `
            await connection.query(viewUpdateQuery);
            
            return getNoticeMediaRow;
        }
    }
};

async function postComment(connect, postCommentParams){
    const postCommentQuery = `
    INSERT INTO NormalNoticeBoardComments(NormalNoticeBoardId, writerId, upperCommentId, content) VALUES(${postCommentParams.postId}, ${postCommentParams.writerId}, ${postCommentParams.upperId}, '${postCommentParams.content}')
    `

    const postCommentRow = await connect.query(postCommentQuery);

    return postCommentRow;
} 

async function getComment(connect, noticePage){
    const getCommentQuery = `
    SELECT NNBC.id AS commentId, NNBC.createdAt, NNBC.upperCommentId, User.generation, User.name, NNBC.content
    FROM NormalNoticeBoardComments AS NNBC INNER JOIN User ON NNBC.writerId = User.id
    WHERE NNBC.NormalNoticeBoardId = ${noticePage};
    `
    const [getCommentRes] = await connect.query(getCommentQuery);

    return getCommentRes;
}


module.exports ={
    postNoticeBoard,
    getNormalNoticeTitle,
    getChasingNormalTitle,
    getNoticeContent,
    postComment,
    getComment,
}